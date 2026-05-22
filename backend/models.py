from pydantic import BaseModel
from typing import Dict

class QuizSubmission(BaseModel):
    answers: Dict[str, str]