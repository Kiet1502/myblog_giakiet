// --- DATA BÀI VIẾT ---
const javaPosts = [
    {
        img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
        tag: 'Java 8+',
        title: 'Tạm biệt vòng lặp For với Java Stream API',
        desc: 'Tại sao bạn nên dùng Stream để code ngắn gọn...',
        url: 'post-java-stream.html'
    },
    {
        img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        tag: 'Tips',
        title: 'Debug hiệu quả trong Java: 7 mẹo thực chiến',
        desc: 'Cách sử dụng debug tool và log để tìm lỗi nhanh chóng.',
        url: 'post-java-debug.html'
    },
    {
        img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
        tag: 'OOP',
        title: 'Lập trình hướng đối tượng với Java',
        desc: 'Giới thiệu các khái niệm OOP và ví dụ thực tế trong Java.',
        url: 'post-java-oop.html'
    },
    {
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        tag: 'Open Source',
        title: 'Tham gia dự án mã nguồn mở Java',
        desc: 'Lợi ích và cách bắt đầu đóng góp cho cộng đồng Java.',
        url: 'post-java-opensource.html'
    },
    {
        img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
        tag: 'Spring Boot',
        title: 'Xây dựng REST API với Spring Boot',
        desc: 'Hướng dẫn tạo API đơn giản với Spring Boot cho người mới.',
        url: 'post-java-springboot.html'
    },
];

const jsPosts = [
    {
        img: 'https://images.unsplash.com/photo-1461344577544-4e5dc9487184?auto=format&fit=crop&w=600&q=80',
        tag: 'JavaScript',
        title: 'Async/Await: Làm chủ bất đồng bộ trong JS',
        desc: 'Giải thích dễ hiểu về async/await và cách áp dụng thực tế.',
        url: 'post-async-await.html'
    },
    {
        img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
        tag: 'Productivity',
        title: '5 extension giúp code JavaScript nhanh hơn',
        desc: 'Các tiện ích VSCode giúp tăng tốc độ lập trình JS.',
        url: 'post-js-extensions.html'
    },
    {
        img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
        tag: 'Tips',
        title: '7 mẹo tối ưu code JavaScript cho web',
        desc: 'Những kỹ thuật giúp JS chạy nhanh và mượt hơn trên trình duyệt.',
        url: 'post-js-tips.html'
    },
    {
        img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        tag: 'OOP',
        title: 'Lập trình hướng đối tượng với JavaScript',
        desc: 'Áp dụng OOP vào dự án thực tế với ES6 class.',
        url: 'post-js-oop.html'
    },
];

// --- HÀM RENDER BÀI VIẾT VÀ PHÂN TRANG ---
function renderPosts(posts, containerId, paginationId, page) {
    const perPage = 3;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pagePosts = posts.slice(start, end);
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    pagePosts.forEach(post => {
        container.innerHTML += `
            <article class="card">
                <img src="${post.img}" alt="${post.title}">
                <div class="card-body">
                    <span class="tag ${post.tag.toLowerCase().includes('java') ? 'java' : 'js'}">${post.tag}</span>
                    <h3>${post.title}</h3>
                    <p>${post.desc}</p>
                    <a href="${post.url ? post.url : '#'}" class="btn btn-small read-more">Đọc toàn bộ bài viết</a>
                </div>
            </article>
        `;
    });
    renderPagination(posts.length, page, paginationId, containerId);
}

function renderPagination(total, current, paginationId, containerId) {
    const perPage = 3;
    const totalPages = Math.ceil(total / perPage);
    const pag = document.getElementById(paginationId);
    pag.innerHTML = '';
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
        pag.innerHTML += `<button class="page-btn${i === current ? ' active' : ''}" data-page="${i}" data-container="${containerId}">${i}</button>`;
    }
}

// --- SỰ KIỆN PHÂN TRANG ---
document.addEventListener('DOMContentLoaded', function() {
    let javaPage = 1, jsPage = 1;
    renderPosts(javaPosts, 'java-posts', 'java-pagination', javaPage);
    renderPosts(jsPosts, 'js-posts', 'js-pagination', jsPage);

    document.getElementById('java-pagination').addEventListener('click', function(e) {
        if (e.target.classList.contains('page-btn')) {
            javaPage = parseInt(e.target.dataset.page);
            renderPosts(javaPosts, 'java-posts', 'java-pagination', javaPage);
        }
    });
    document.getElementById('js-pagination').addEventListener('click', function(e) {
        if (e.target.classList.contains('page-btn')) {
            jsPage = parseInt(e.target.dataset.page);
            renderPosts(jsPosts, 'js-posts', 'js-pagination', jsPage);
        }
    });
});
// Khi người dùng click vào các link trên menu, trang sẽ cuộn mượt mà
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

console.log("Blog của Kiệt đã sẵn sàng!");