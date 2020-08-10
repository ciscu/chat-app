from flask import Flask, request

app = Flask(__name__)

chats = [
]

id = 0

@app.route('/chats', methods=["GET"])
def get_posts():
    return {'chats': [chat for chat in chats]}


@app.route('/new_chat', methods=["POST"])
def new_chat():
    global id
    new_chat_message = request.json
    new_chat_message["id"] = id
    print(new_chat_message)
    id += 1
    chats.append(new_chat_message)
    return {'message': 'Message added to db'}, 201


if __name__ == '__main__':
    app.run(debug=True)