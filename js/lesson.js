        "use strict";

        var editor = null, diffEditor = null;

        $(document).ready(function () {
            
            var request = new XMLHttpRequest();
            request.open("GET", "config.json", false);
            request.send(null);
            const settings = JSON.parse(request.responseText);
            
            const languageMode = 'cpp';
            const defaultCodeURL = settings.codePath + '/' + settings.codeTemplates[0];

            let savedCode = localStorage.getItem('cpp_main_lesson1_code');
            if (savedCode) {
                // saved code from db
                $('.loading.editor').show();
                loadSample(languageMode, savedCode);
                $('.loading.editor').fadeOut({ duration: 300 });
            }
            else {
                // defaul sample
                $('.loading.editor').show();
                xhr(defaultCodeURL, function (err, data) {
                    if (err) {
                        if (editor) {
                            if (editor.getModel()) {
                                editor.getModel().dispose();
                            }
                            editor.dispose();
                            editor = null;
                        }
                        $('.loading.editor').fadeOut({ duration: 200 });
                        $('#editor').empty();
                        $('#editor').append('<p class="alert alert-error">Failed to load ' + languageCode + ' sample</p>');
                        return;
                    }

                    loadSample(languageMode, data);

                    $('.loading.editor').fadeOut({ duration: 300 });
                });
            }

            window.onresize = function () {
                if (editor) {
                    editor.layout();
                }
                if (diffEditor) {
                    diffEditor.layout();
                }
            };
        });

        var preloaded = {};
        (function () {
            var elements = Array.prototype.slice.call(document.querySelectorAll('pre[data-preload]'), 0);

            elements.forEach(function (el) {
                var path = el.getAttribute('data-preload');
                preloaded[path] = el.innerText || el.textContent;
                el.parentNode.removeChild(el);
            });
        })();

        function xhr(url, cb) {
            if (preloaded[url]) {
                return cb(null, preloaded[url]);
            }
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'text',
                error: function () {
                    cb(this, null);
                }
            }).done(function (data) {
                cb(null, data);
            });
        }

        function loadSample(languageCode, code) {
            if (!editor) {
                $('#editor').empty();
                editor = monaco.editor.create(document.getElementById('editor'), {
                    model: null,
                });
            }

            var oldModel = editor.getModel();
            var newModel = monaco.editor.createModel(code, languageCode);
            editor.setModel(newModel);
            if (oldModel) {
                oldModel.dispose();
            }
            changeTheme(0);
        }

        function changeTheme(theme) {
            var newTheme = (theme === 0 ? 'vs-dark' : 'vs');
            monaco.editor.setTheme(newTheme);
        }
