from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chat import get_response

app=Flask(__name__)

# cors = CORS(app, resources={
#     r"/api/*": {"origins": "*"}
# })
CORS(app)
@app.route('/')
def index_get():
    return render_template("base.html",script_root=request.script_root)

@app.post("/predict")
def predict():
    text=request.get_json().get("message")
    response=get_response(text)
    message={"answer":response}
    return jsonify(message)

if __name__=="__main__":
    from waitress import serve
    serve(app,host="0.0.0.0",port=8080)
    app.run(debug=True)