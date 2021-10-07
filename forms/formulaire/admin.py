from django.contrib import admin
from .models import Formulaire,Question,Option,Response

# Register your models here.
class OptionInline(admin.TabularInline):
    model=Option
class ResponseInline(admin.TabularInline):
    model = Response
class QuestionInline(admin.TabularInline):
    model=Question
class FormulaireAdmin(admin.ModelAdmin):
    inlines=[QuestionInline]
class QuestionAdmin(admin.ModelAdmin):
    inlines=[OptionInline]


admin.site.register(Formulaire,FormulaireAdmin)
admin.site.register(Question,QuestionAdmin)
admin.site.register(Option)
admin.site.register(Response)