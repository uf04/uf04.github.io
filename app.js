// 유튜브 API 키 (구글 클라우드 콘솔에서 발급받은 키 입력)
const YOUTUBE_API_KEY = 'AIzaSyBslbhmDHYGQVzmS6Zec4ySBtnBxhsp7jc';

// 표시할 유튜브 영상 ID 목록 (쇼츠 URL의 맨 끝 알파벳+숫자 조합 입력)
const videoIds = ['-a9qK04fWf4']; 

async function fetchYouTubeStats() {
    const grid = document.getElementById('video-grid');
    if (!grid) return;
    
    // 이전에 생성된 내용 초기화
    grid.innerHTML = '';
    
    const idsString = videoIds.join(',');
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${idsString}&key=${YOUTUBE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            grid.innerHTML = '<p style="color: #888;">표시할 비디오 영상이 없습니다.</p>';
            return;
        }

        data.items.forEach(item => {
            const views = Number(item.statistics.viewCount).toLocaleString();
            const likes = Number(item.statistics.likeCount).toLocaleString();
            const title = item.snippet.title;
            const thumbnail = item.snippet.thumbnails.high.url;

            const cardHTML = `
                <div class="card vertical">
                    <div class="img-container">
                        <img src="${thumbnail}" alt="${title}" class="mockup-img">
                    </div>
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
        grid.innerHTML = '<p style="color: #ff6b6b;">실시간 실적 데이터를 불러오지 못했습니다. API 키나 ID를 확인해 주세요.</p>';
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', fetchYouTubeStats);