const cabecalho = document.querySelector(".cabecalho");
const linksNavegacao = document.querySelectorAll(".navegacao-lista a");
const secoes = document.querySelectorAll("section[id]");

function rolarParaSecao(event) {
    const link = event.currentTarget;
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) {
        return;
    }

    const secao = document.querySelector(href);

    if (!secao) {
        return;
    }

    event.preventDefault();

    const alturaCabecalho = cabecalho.offsetHeight;
    const posicaoSecao = secao.offsetTop - alturaCabecalho - 16;

    window.scrollTo({
        top: posicaoSecao,
        behavior: "smooth"
    });
}

function alterarEstiloCabecalho() {
    if (window.scrollY > 20) {
        cabecalho.classList.add("cabecalho--rolagem");
    } else {
        cabecalho.classList.remove("cabecalho--rolagem");
    }
}

function destacarLinkAtivo() {
    let idSecaoAtual = "";

    secoes.forEach((secao) => {
        const alturaSecao = secao.offsetHeight;
        const topoSecao = secao.offsetTop - cabecalho.offsetHeight - 80;

        if (window.scrollY >= topoSecao && window.scrollY < topoSecao + alturaSecao) {
            idSecaoAtual = secao.getAttribute("id");
        }
    });

    linksNavegacao.forEach((link) => {
        link.classList.remove("link-ativo");

        if (link.getAttribute("href") === `#${idSecaoAtual}`) {
            link.classList.add("link-ativo");
        }
    });
}

linksNavegacao.forEach((link) => {
    link.addEventListener("click", rolarParaSecao);
});

window.addEventListener("scroll", () => {
    alterarEstiloCabecalho();
    destacarLinkAtivo();
});

alterarEstiloCabecalho();
destacarLinkAtivo();