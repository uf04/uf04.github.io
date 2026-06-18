// 유튜브 API 키 (구글 클라우드 콘솔에서 발급 필요)
const YOUTUBE_API_KEY = 'AIzaSyBslbhmDHYGQVzmS6Zec4ySBtnBxhsp7jc';

// 표시할 유튜브 영상 ID 목록 (유튜브 URL의 v= 뒷부분)
const videoIds = ['-a9qK04fWf4']; 

async function fetchYouTubeStats() {
    const grid = document.getElementById('video-grid');
    
    // 여러 영상 데이터를 한 번에 요청
    const idsString = videoIds.join(',');
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${idsString}&key=${YOUTUBE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        data.items.forEach(item => {
            const views = Number(item.statistics.viewCount).toLocaleString();
            const likes = Number(item.statistics.likeCount).toLocaleString();
            const title = item.snippet.title;
            const thumbnail = item.snippet.thumbnails.high.url;

            const cardHTML = `
                <div class="card">
                    <img src="${thumbnail}" alt="${title}" class="mockup-img">
                    <div class="card-info">
                        <h3>${title}</h3>
                        <div class="stats">
                            <span>👁️ ${views}회</span>
                            <span>❤️ ${likes}개</span>
                        </div>
                    </div>
                </div>
            `;
            grid.innerHTML += cardHTML;
        });
    } catch (error) {
        console.error('유튜브 데이터를 불러오는 중 에러 발생:', error);
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', fetchYouTubeStats);