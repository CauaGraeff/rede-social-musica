const sliders = document.querySelectorAll('.albums-grid');

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.style.cursor = 'grab';

    slider.addEventListener('wheel', (e) => {

        e.preventDefault();

        slider.scrollLeft += e.deltaY * 2.5;
    });

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const coracoesMusica = document.querySelectorAll('.icone-coracao-musica');
    coracoesMusica.forEach(coracao => {
        coracao.addEventListener('click', function () {
            this.classList.toggle('ativo');
            if (this.classList.contains('ativo')) {
                this.classList.replace('bi-heart', 'bi-heart-fill');
            } else {
                this.classList.replace('bi-heart-fill', 'bi-heart');
            }
        });
    });

    const coracaoAlbum = document.querySelector('.btn-favorito-album');
    if (coracaoAlbum) {
        coracaoAlbum.addEventListener('click', function () {
            this.classList.toggle('ativo');
            const icone = this.querySelector('i');
            if (this.classList.contains('ativo')) {
                icone.classList.replace('bi-heart', 'bi-heart-fill');
            } else {
                icone.classList.replace('bi-heart-fill', 'bi-heart');
            }
        });
    }

    const blocosEstrelas = document.querySelectorAll('.estrelas-musica');
    blocosEstrelas.forEach(bloco => {
        const estrelas = bloco.querySelectorAll('.estrela-interativa');

        estrelas.forEach(estrela => {
            estrela.addEventListener('click', function () {
                const valorClicado = parseInt(this.getAttribute('data-valor'));

                estrelas.forEach(est => {
                    const valorEstrela = parseInt(est.getAttribute('data-valor'));
                    if (valorEstrela <= valorClicado) {
                        est.classList.add('ativa');
                    } else {
                        est.classList.remove('ativa');
                    }
                });
            });
        });
    });

    const estrelasComentario = document.querySelectorAll('.estrela-comentario-interativa');
    estrelasComentario.forEach(estrela => {
        estrela.addEventListener('click', function () {
            const valorClicado = parseInt(this.getAttribute('data-valor'));

            estrelasComentario.forEach(est => {
                const valorEstrela = parseInt(est.getAttribute('data-valor'));
                if (valorEstrela <= valorClicado) {
                    est.classList.add('ativa');
                } else {
                    est.classList.remove('ativa');
                }
            });
        });
    });

    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    if (emailInput && senhaInput) {
        [emailInput, senhaInput].forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    Logar();
                }
            });
        });
    }

    const comentarioInput = document.getElementById('comentario');
    if (comentarioInput) {
        comentarioInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                ComentarMusica();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const botoesVoltar = document.querySelectorAll('.bi-arrow-left, .bi-chevron-left');

    botoesVoltar.forEach(botao => {
        const linkPai = botao.closest('a') || botao.closest('button');

        if (linkPai) {
            linkPai.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.back();
            });
        }
    });
});

function Logar() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    let emailCorreto = "geovana@hotmail.com";
    let senhaCorreta = 1234;
    if (email == emailCorreto && senha == senhaCorreta) {
        window.location.href = 'tela_albuns.html';
    } else {
        alert("Email ou Senha incorretas!");
    }
}

function ComentarMusica() {
    const comentarioInput = document.getElementById('comentario');
    const comentarioTexto = comentarioInput.value.trim();
    const estrelas = Array.from(document.querySelectorAll('#avaliacao .estrela-comentario-interativa'));
    const estrelasAtivas = estrelas.filter(estrela => estrela.classList.contains('ativa')).length;
    const listaComentarios = document.getElementById('comentarios-lista');

    if (!comentarioTexto) {
        alert('Escreva um comentário antes de enviar.');
        comentarioInput.focus();
        return;
    }

    const comentarioItem = document.createElement('div');
    comentarioItem.className = 'comentario-item';
    comentarioItem.innerHTML = `
        <div class="comentario-topo">
            <div>
                <span class="comentario-autor">Você</span>
                <span class="comentario-data">Agora</span>
            </div>
            <div class="comentario-stars">${getStarsHtml(estrelasAtivas)}</div>
        </div>
        <p class="comentario-texto">${comentarioTexto}</p>
    `;

    listaComentarios.prepend(comentarioItem);
    comentarioInput.value = '';
    estrelas.forEach(estrela => estrela.classList.remove('ativa'));
}

function getStarsHtml(contagem) {
    const max = 5;
    let html = '';
    for (let i = 1; i <= max; i++) {
        html += `<i class="bi ${i <= contagem ? 'bi-star-fill' : 'bi-star'}"></i>`;
    }
    return html;
}

