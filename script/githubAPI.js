// githubAPI.js - GitHub REST API 연동 실시간 커밋 조회 모듈

/**
 * 지정된 저장소의 최신 커밋 목록을 조회합니다.
 * @param {string} owner 저장소 소유자 ID
 * @param {string} repo 저장소 이름
 * @param {number} perPage 가져올 커밋 개수 (기본값: 3)
 * @returns {Promise<Array<{message: string, date: string, author: string, sha: string, url: string}>>}
 */
export async function fetchRecentCommits(owner = 'neverleaveualong', repo = 'skala-front', perPage = 3) {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API 호출 실패 (상태 코드: ${response.status})`);
    }

    const data = await response.json();
    
    return data.map(item => {
      // 날짜 포맷팅 (YYYY-MM-DD HH:MM)
      const commitDate = new Date(item.commit.author.date);
      const formattedDate = commitDate.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      return {
        message: item.commit.message.split('\n')[0], // 첫 줄만 추출
        date: formattedDate,
        author: item.commit.author.name,
        sha: item.sha.substring(0, 7), // Short SHA
        url: item.html_url
      };
    });
  } catch (error) {
    console.error('GitHub Commits Fetch Error:', error);
    throw error;
  }
}
