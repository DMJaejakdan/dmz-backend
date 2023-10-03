from pydantic import BaseSettings


class Settings(BaseSettings):
    HOST: str = '0.0.0.0'
    PORT: int = 8000
    ELASTIC_USERNAME: str
    ELASTIC_PASSWORD: str

    class Config:
        env_file = '.env'

    def describe_settings(self):
        return {'host': self.HOST,
                'port': self.PORT,
                'username': self.ELASTIC_USERNAME,
                'password': self.ELASTIC_PASSWORD}


def get_settings() -> Settings:
    return Settings()
