from app import db
from sqlalchemy_serializer import SerializerMixin

class Breed(db.Model, SerializerMixin):
    
    id = db.Column(db.Integer, primary_key=True)
    breed = db.Column(db.String(64), index=True, unique=True)
    mixed = db.Column(db.String(120), index=True)

    def __init__(self, breed, mixed):
        self.breed = breed
        self.mixed = mixed
    
class Dog(db.Model, SerializerMixin):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True)
    gender = db.Column(db.String(120), index=True)
    breed = db.Column(db.String(120), index=True)
    mixed = db.Column(db.String(120), index=True)
    fixed = db.Column(db.Boolean(), index=True)

    def __init__(self, name, gender, breed, mixed, fixed):
        if fixed == "True":
            fixed = True
        else:
            fixed = False
        self.name = name
        self.gender = gender
        self. breed = breed
        self.mixed = mixed
        self.fixed = fixed
        