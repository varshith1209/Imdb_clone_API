from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

DEFAULT_AVATAR = "https://api.dicebear.com/7.x/initials/svg"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    profile_picture = models.URLField(blank=True, null=True, default=DEFAULT_AVATAR)

    def __str__(self):
        return f"{self.user.username} Profile"


@receiver(post_save, sender=User)
def ensure_profile(sender, instance, created, **kwargs):
    """
    Guarantee that every auth user has an attached profile row.
    """
    profile, _ = Profile.objects.get_or_create(user=instance)
    # Seed a unique avatar once, if none was provided.
    if not profile.profile_picture:
        profile.profile_picture = f"{DEFAULT_AVATAR}?seed={instance.username}"
        profile.save(update_fields=["profile_picture"])
