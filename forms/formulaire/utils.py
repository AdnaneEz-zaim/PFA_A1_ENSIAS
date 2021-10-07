import matplotlib.pyplot as plt
import base64
import io

def get_graph():
    buffer= io.BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph =base64.b64encode(image_png)
    graph= graph.decode('utf-8')
    buffer.close()
    return graph
    
def get_pie_plot(title,x,y):
    plt.switch_backend('AGG')
    plt.figure(figsize=(6,4))
    plt.title(title)
    plt.pie(x=x,labels=y,autopct='%1.2f%%')   
    plt.tight_layout()
    graph=get_graph()
    plt.close('all')
    return graph

def get_bar_plot(title,x,y):
    plt.switch_backend('AGG')
    plt.figure(figsize=(6,4))
    plt.title(title)
    plt.bar(y,x,width=1/4) 
    plt.tight_layout()
    graph=get_graph()
    plt.close('all')
    return graph

