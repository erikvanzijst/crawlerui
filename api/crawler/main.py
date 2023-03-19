import datetime

import aiodocker
import uvicorn as uvicorn
from dateutil import parser
from fastapi import FastAPI

from crawler.schemas import Crawler, CrawlerState

app = FastAPI()
crawlers = {}


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/crawlers", status_code=200)
async def read_crawlers() -> list[Crawler]:
    async with aiodocker.Docker() as docker:
        for c in crawlers.values():
            container = await docker.containers.get(c.id)
            state = await container.show()
            c.state = (CrawlerState.RUNNING if state['State']['Running'] else (
                CrawlerState.FAILED if state['State']['ExitCode'] else CrawlerState.FINISHED))
            c.finished_at = parser.parse(state['State']['FinishedAt'])
    return list(crawlers.values())


@app.post('/crawlers', status_code=201)
async def create_crawler(url: str) -> Crawler:
    async with aiodocker.Docker() as docker:
        container = await docker.containers.create(
            config={
                'Cmd': ['/app/crawl', '-u', url],
                'Image': 'crawlerui_api:latest',
            },
        )
        await container.start()
        state = await container.show()
        crawlers[container.id] = Crawler(
            id=container.id,
            url=url,
            state=(CrawlerState.RUNNING if state['State']['Running'] else (
                CrawlerState.FAILED if state['State']['ExitCode'] else CrawlerState.FINISHED)),
            created_at=parser.parse(state['State']['StartedAt']),
            finished_at=parser.parse(state['State']['FinishedAt'])
        )
        return crawlers[container.id]


@app.get('/crawlers/{crawler_id}/logs', status_code=200)
async def read_crawler_logs(crawler_id: str):
    async with aiodocker.Docker() as docker:
        container = await docker.containers.get(crawler_id)
        logs = await container.log(stdout=True)
        return '\n'.join(logs)


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000, workers=1, reload=False)
