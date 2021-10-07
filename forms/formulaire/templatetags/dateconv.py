from django import template

register=template.Library()

@register.filter("dateStr")
def dateStr(date,arg):
    return date.strftime(arg)