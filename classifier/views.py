from django.shortcuts import render
from django.conf import settings
import datetime
from .models import *
from PIL import Image
import base64
import os
import numpy as np
import json
from django.http import JsonResponse

# import tensorflow / keras libraries
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model

path = str(settings.BASE_DIR) + '/classifier/model.h5'
model = load_model(path)

def DigitsIndexView(request):
    template_name = 'index.html'
    return render(request, template_name, {})

def DigitsResultView(request):
    digitImage = request.POST.get('digitImage')
    digitImage = '+'.join(digitImage.split(' '))
    imgData = base64.b64decode(digitImage)
    obj = Digit(created_on=datetime.datetime.now())
    obj.save()
    filename = 'digitImage.jpg'
    with open(filename, 'wb') as f:
        f.write(imgData)
    classified_as, probabilities = Classify(filename).classify()

    probabilities = [
        round((probabilities[0][0])*100,2),
        round((probabilities[0][1])*100,2),
        round((probabilities[0][2])*100,2),
        round((probabilities[0][3])*100,2),
        round((probabilities[0][4])*100,2),
        round((probabilities[0][5])*100,2),
        round((probabilities[0][6])*100,2),
        round((probabilities[0][7])*100,2),
        round((probabilities[0][8])*100,2),
        round((probabilities[0][9])*100,2),
    ]

    os.remove(str(settings.BASE_DIR) +'/'+filename)
    context = {
        'classified_as': int(classified_as),
        'probabilities': probabilities,
        }
    context = json.dumps(context)
    return JsonResponse({
            'classified_as': int(classified_as),
            'probabilities': probabilities,
            },
            status=200
            )


# load and prepare the image
def load_image(filename):
    # load the image
    img = load_img(filename, color_mode="grayscale", target_size=(28, 28), interpolation='bilinear')
    # convert to array
    img = img_to_array(img)
    # reshape into a single sample with 1 channel
    img = img.reshape(1, 28, 28, 1)
    # prepare pixel data
    img = img.astype('float32')
    img = img / 255.0
    return img

# classify image
class Classify:
    def __init__(self, filename):
        self.filename = filename

    def classify(self):
        image = load_image(self.filename)
        return np.argmax(model.predict(image), axis=-1), model.predict(image,batch_size=1)
