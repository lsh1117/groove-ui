// minimal helper to wrap .group blocks into examples with code view
(function () {
    function escapeHtml(html) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function buildExampleBlock(groupEl, titleText) {
        var wrapper = document.createElement('section');
        wrapper.className = 'example';

        var preview = document.createElement('div');
        preview.className = 'example__preview';
        // move group into preview
        preview.appendChild(groupEl);

        var toolbar = document.createElement('div');
        toolbar.className = 'example__toolbar';
        var title = document.createElement('div');
        title.className = 'example__title';
        title.textContent = titleText || 'Example';
        var actions = document.createElement('div');
        actions.className = 'example__actions';
        var toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'example__btn';
        toggleBtn.textContent = '코드 보기';
        actions.appendChild(toggleBtn);
        toolbar.appendChild(title);
        toolbar.appendChild(actions);

        var codeWrap = document.createElement('div');
        codeWrap.className = 'example__code';
        var pre = document.createElement('pre');
        pre.classList.add('line-numbers');
        var code = document.createElement('code');
        code.className = 'language-html';
        // original HTML for group
        var html = groupEl.outerHTML;
        code.innerHTML = escapeHtml(html);
        pre.appendChild(code);
        codeWrap.appendChild(pre);


        wrapper.appendChild(preview);
        wrapper.appendChild(toolbar);
        wrapper.appendChild(codeWrap);

        toggleBtn.addEventListener('click', function () {
            var isOpen = codeWrap.style.display === 'block';
            codeWrap.style.display = isOpen ? 'none' : 'block';
            toggleBtn.textContent = isOpen ? '코드 보기' : '코드 닫기';
        });

        return wrapper;
    }

    function includeCSS(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    function includeJS(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true; // 비동기 로딩
        script.onload = () => {
            console.log(`${src} 로드 완료`);
            if (callback) callback();
        };
        script.onerror = () => console.error(`${src} 로드 실패`);
        document.head.appendChild(script);
    }

    function init() {
        var groups = Array.prototype.slice.call(document.querySelectorAll('.group'));
        groups.forEach(function (groupEl, index) {
            var parent = groupEl.parentNode;
            var example = buildExampleBlock(groupEl, groupEl.getAttribute('data-title') || '예제 ' + (index + 1));
            parent.insertBefore(example, parent.firstChild === groupEl ? groupEl : groupEl.nextSibling);
        });

        const cssFiles = [
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css'
        ];

        const jsFiles = [
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/normalize-whitespace/prism-normalize-whitespace.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js',
            'https://unpkg.com/prettier@2.8.8/standalone.js',
            'https://unpkg.com/prettier@2.8.8/parser-html.js'
        ];

        cssFiles.forEach(href => includeCSS(href));
        jsFiles.forEach(src => includeJS(src));

        setTimeout(function(){
            document.querySelectorAll("pre code.language-html").forEach((block) => {
                const formatted = prettier.format(block.textContent, {
                    parser: "html",
                    plugins: prettierPlugins,
                });
                block.textContent = formatted;
                Prism.highlightElement(block);
            });
        },300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();