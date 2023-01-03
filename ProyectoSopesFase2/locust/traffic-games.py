import time
from locust import HttpUser, task
import json
import random



class QuickstartUser(HttpUser):
    casos=[]
    with open('games.json') as json_file:
        data= json.load(json_file)
        casos.extend(data)
        

    @task
    def api_page(self):
        time.sleep(1)
        #aqui solo se envia el nombre del endpoint, en el server de locust se manda el HOST (http://localhost:3000)
        response =self.client.post ("/enviarLoadBalancer", json=random.choice(self.casos))
       #testear "http://localhost:3000" en vez de "localhost:3000"

# ingresar por medio de
#         localhost:8089
