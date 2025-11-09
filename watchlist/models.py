from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
# Create your models here.
class Streamplatform(models.Model):
    name=models.CharField(max_length=20)
    about=models.CharField(max_length=40)
    website=models.CharField(max_length=40)
    
    def __str__(self):
        return self.name

class Watchlist(models.Model):
    title=models.CharField(max_length=30)
    plot=models.CharField(max_length=150)
    watchlist=models.ForeignKey(Streamplatform,on_delete=models.CASCADE,related_name='watchlist')
    number_rating=models.IntegerField(default=0)
    avg_rating=models.FloatField(default=0)
    date=models.DateField()
    
    def __str__(self):
        return self.title
class Reviews(models.Model):
    rating=models.PositiveIntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    review_user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="reviewer")
    description=models.CharField(max_length=200)
    movie=models.ForeignKey(Watchlist,on_delete=models.CASCADE,related_name='movie')
    created_on=models.DateField(auto_now_add=True)
    updated_on=models.DateField(auto_now=True)
    
    def __str__(self):
        return str(self.rating)+'-'+self.movie.title
    