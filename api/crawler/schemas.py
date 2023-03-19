from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class CrawlerState(Enum):
    RUNNING = 'running'
    FINISHED = 'finished'
    FAILED = 'failed'


class Crawler(BaseModel):
    id: str
    url: str
    state: CrawlerState
    created_at: datetime
    finished_at: Optional[datetime]
