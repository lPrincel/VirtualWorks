from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        name = request.form.get('name')
        bio = request.form.get('bio')
        image_url = request.form.get('image_url')
        
        user_data = {
            'name': name,
            'bio': bio,
            'image_url': image_url
        }
        
        return render_template('card.html', user=user_data)
        
    return render_template('form.html')

if __name__ == '__main__':
    app.run(debug=True)
