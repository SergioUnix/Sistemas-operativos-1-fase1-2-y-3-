import time
from locust import HttpUser, task
import json
import random

class QuickstartUser(HttpUser):
    arreglo=[]
    with open('juegos20.json') as json_file:
        data= json.load(json_file)
        arreglo.extend(data)


    @task
    def api_page(self):
        
        #aqui solo se envia el nombre del endpoint, en el server de locust se manda el HOST (http://localhost:3000)
        
    
        #inicia desde el arreglo[0] hasta arreglo[longitud] para recorrer
        print(len(self.arreglo))
        for i in range (0,len(self.arreglo)):
            response =self.client.post ("/enviarLoadBalancer", self.arreglo[i])
            print(self.arreglo[i])
            time.sleep(1)
        
        #sirve para que cuando termine de mandar todo los datos de arreglo[], pare de enviar
        self.environment.runner.stop()

       #testear "http://localhost:3000" en vez de "localhost:3000"

# ingresar por medio de
#         localhost:8089