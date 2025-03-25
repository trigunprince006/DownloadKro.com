from flask import Flask, request, jsonify
import yt_dlp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend requests

@app.route('/getVideoInfo', methods=['GET'])
def get_video_info():
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({"error": "Missing URL"}), 400

    ydl_opts = {'quiet': True, 'noplaylist': True}
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=False)
        
        # Get video details
        video_title = info.get("title")
        thumbnail = info.get("thumbnail")
        duration = info.get("duration")

        # Get available formats
        formats = []
        for f in info['formats']:
            if 'url' in f and f.get('height') is not None:
                formats.append({
                    "quality": f.get('format_note', f.get('resolution', 'Unknown')),

                    "resolution": f['height'],
                    "format": f['ext'],
                    "url": f['url']
                })

    return jsonify({
        "success": True,
        "title": video_title,
        "thumbnail": thumbnail,
        "duration": duration,
        "formats": formats
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
