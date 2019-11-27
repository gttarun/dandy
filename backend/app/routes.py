from app import app, db
from app.models import Dog, Breed
from flask import Flask, jsonify, request
from flask_cors import CORS
import xlrd

CORS(app)

@app.route("/")
def index():
    return "Hello world!"

@app.route("/sync", methods=["GET"])
def storeBreeds():
    wb = xlrd.open_workbook("./breeds.xlsx")
    sheet = wb.sheet_by_index(0)
    x, y = 1, 0
    while (sheet.cell(x, y).value != 'END'):
        new_breed = Breed(sheet.cell(x, y).value, sheet.cell(x, y + 1).value)

        db.session.add(new_breed)
        db.session.commit()

        x = x + 1

    return "SUCCESS"

@app.route("/breeds", methods=["GET"])
def get_breeds():
    all = []
    all_breeds = Breed.query.all()
    for breed in all_breeds:
        all.append(breed.to_dict())
    
    return jsonify(all)

@app.route("/newdog", methods=["POST"])
def add_dog():
    data = request.get_json()
    
    name = data['name']
    gender = data['gender']
    mixed = data['mixed']
    fixed = data['fixed']
    breed = data['breed']
    
    new_dog = Dog(name, breed, gender, mixed, fixed)
    
    db.session.add(new_dog)
    db.session.commit()
    
    return jsonify(all)

@app.route("/dogs", methods=["GET"])
def get_all_dogs():
    all = []
    all_dogs = Dog.query.all()
    for dog in all_dogs:
        all.append(dog.to_dict())
    
    return jsonify(all)
    