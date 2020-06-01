const $boton = document.querySelector("#btnEmpezar");
const $celeste = document.querySelector("#celeste");
const $violeta = document.querySelector("#violeta");
const $naranja = document.querySelector("#naranja");
const $verde = document.querySelector("#verde");
const ULTIMO_NIVEL = 3;
const NIVEL_COMPARAR = ULTIMO_NIVEL + 1;
swal(
	"Hola que tal!",
	"Bienvenido a Simon Dice, prueba tu destreza y demuestra que eres un pro en la memorizacion.",
	"info"
);
class Juego {
	constructor() {
		// this.inicializar = this.inicializar.bind(this);
		this.siguienteNivel = this.siguienteNivel.bind(this);
		this.elegirColor = this.elegirColor.bind(this);
		this.inicializar();
		this.generarSecuencia();
		setTimeout(this.siguienteNivel, 500);
	}
	inicializar() {
		// this.siguienteNivel = this.siguienteNivel.bind(this);
		// this.elegirColor = this.elegirColor.bind(this);
		this.toggleEmpezar();
		this.nivel = 1;
		this.colores = {
			celeste: $celeste,
			violeta: $violeta,
			naranja: $naranja,
			verde: $verde,
		};
	}

	toggleEmpezar() {
		if ($boton.classList.contains("hide")) {
			$boton.classList.remove("hide");
		} else {
			$boton.classList.add("hide");
		}
	}
	generarSecuencia() {
		this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map((n) => Math.floor(Math.random() * 4));
	}
	siguienteNivel() {
		this.subNivel = 0;
		this.iluminarSecuencia();
		this.agregarEventoClick();
	}
	transformarNumeroColor(numero) {
		switch (numero) {
			case 0:
				return "celeste";
				break;
			case 1:
				return "violeta";
				break;
			case 2:
				return "naranja";
				break;
			case 3:
				return "verde";
				break;
			default:
				break;
		}
	}
	transformarColorNumero(color) {
		switch (color) {
			case "celeste":
				return 0;
				break;
			case "violeta":
				return 1;
				break;
			case "naranja":
				return 2;
				break;
			case "verde":
				return 3;
				break;
			default:
				break;
		}
	}
	apagarColor(color) {
		this.colores[color].classList.remove("light");
	}
	iluminarColor(color) {
		this.colores[color].classList.add("light");
		setTimeout(() => this.apagarColor(color), 350);
	}
	iluminarSecuencia() {
		for (let i = 0; i < this.nivel; i++) {
			const color = this.transformarNumeroColor(this.secuencia[i]);
			setTimeout(() => this.iluminarColor(color), 1000 * i);
		}
	}
	agregarEventoClick() {
		this.colores.celeste.addEventListener("click", this.elegirColor);
		this.colores.violeta.addEventListener("click", this.elegirColor);
		this.colores.naranja.addEventListener("click", this.elegirColor);
		this.colores.verde.addEventListener("click", this.elegirColor);
	}
	eliminarEventoClick() {
		this.colores.celeste.removeEventListener("click", this.elegirColor);
		this.colores.violeta.removeEventListener("click", this.elegirColor);
		this.colores.naranja.removeEventListener("click", this.elegirColor);
		this.colores.verde.removeEventListener("click", this.elegirColor);
	}
	elegirColor(e) {
		const nombreColor = e.target.dataset.color;
		const numeroColor = this.transformarColorNumero(nombreColor);
		debugger;
		this.iluminarColor(nombreColor);
		if (numeroColor === this.secuencia[this.subNivel]) {
			this.subNivel++;
			if (this.subNivel === this.nivel) {
				this.nivel++;
				this.eliminarEventoClick();
				if (this.nivel === NIVEL_COMPARAR) {
					this.ganoElJuego();
				} else {
					setTimeout(this.siguienteNivel, 1500);
				}
			}
		} else {
			this.perdioElJuego();
		}
	}
	ganoElJuego() {
		swal("Simon dice...", "¡Felicitaciones! Ganaste el juego :)", "success").then(() => {
			this.inicializar();
		});
		// swal('Simon dice...', '¡Felicitaciones! Ganaste el juego :)', 'success').then(
		// 	this.inicializar
		// );
	}
	perdioElJuego() {
		swal("Simon dice...", "Ooops! Perdiste el juego :(", "error").then(() => {
			this.eliminarEventoClick();
			this.inicializar();
		});
	}
}
function empezarJuego() {
	window.juego = new Juego();
}
