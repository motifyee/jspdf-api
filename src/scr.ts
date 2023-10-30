import h2c from "html2canvas";
import { jsPDF } from "jspdf";
// import setFont from "./tj-bold";

const PXTOMM = 0.2645833333;

function _getElement(el: string | HTMLElement): HTMLElement | null {
	let _el: HTMLElement | null =
		typeof el === "string" ? document.getElementById(el) : el;
	return _el;
}

export function measureMM(
	el: string | HTMLElement
): [HTMLElement, number, number] {
	const _el = _getElement(el),
		[w, h] = ["width", "height"]
			.map(prop => window.getComputedStyle(_el as HTMLElement, null)[prop])
			.map(e => Math.floor(parseInt(e) * 0.264583));

	return [_el as HTMLElement, w, h];
}

export function el2canvas(
	el: string | HTMLElement
): Promise<HTMLCanvasElement> {
	const _el = _getElement(el);
	return new Promise(resolve => {
		h2c(_el as HTMLElement, {
			onclone: clonedDoc => {
				clonedDoc.documentElement.style.display = "block";
			},
		}).then(canvas => {
			resolve(canvas);
		});
	});
}

export function saveCanvasAsImage(canvas: HTMLCanvasElement) {
	let uri = canvas
		.toDataURL("image/png")
		.replace("image/png", "image/octet-stream");
	window.location.href = uri;

	// let blob = await canvas2blob(canvas);
	// let link = document.createElement('a');
	// link.href = URL.createObjectURL(blob ?? new Blob());
	// console.log(blob);
	// console.log(link.href);
	// link.click();
}

export function canvas2blob(canvas: HTMLCanvasElement): Promise<Blob> {
	return new Promise(resolve => {
		canvas.toBlob(blob => resolve(blob ?? new Blob()), "image/png");
	});
}

export function canvas2pdf(canvas: HTMLCanvasElement, save = false) {
	let w = canvas.width * PXTOMM,
		h = canvas.height * PXTOMM;
	// uri = canvas.toDataURL('image/png');

	const doc = new jsPDF("p", "mm", [w, h]);
	doc.addImage(canvas, "PNG", 0, 0, w, h);
	if (save) doc.save("test.pdf");
	return doc;
}

export function jsPDF2blob(jsPDF: jsPDF) {
	return jsPDF.output("blob");
}

export async function el2pdf() {
	// 	el: string | HTMLElement,
	// 	save = false
	// ): Promise<jsPDF> {
	// 	const _el = _getElement(el),
	// 		doc = new jsPDF({
	// 			orientation: "p",
	// 			unit: "mm",
	// 			format: [80, 130],
	// 		});
	// 	// doc = new jsPDF('p', 'mm', [80, 130]);
	// 	setFont(doc);
	// 	doc.setFont("Tajawal-Bold", "normal");
	// 	doc.table(
	// 		3,
	// 		5,
	// 		Array(30)
	// 			.fill(0)
	// 			.map(() => ({
	// 				a: "string",
	// 				b: "b-string",
	// 				c: "b-string which is some what is long",
	// 			})),
	// 		["a", "b", "c"],
	// 		{
	// 			padding: 3,
	// 			autoSize: true,
	// 			rowStart: (e, doc) => {
	// 				console.log(e);
	// 				// if (e.row == 2)
	// 				// 	doc.setTableHeaderRow([
	// 				// 		{ width: 23, align: 'center', name: '32', padding: 0, prompt: '' },
	// 				// 	]);
	// 			},
	// 			cellStart(e, doc) {},
	// 			printHeaders: true,
	// 		}
	// 	);
	// 	if (save) doc.save("download-file");
	// return new Promise(resolve => {
	// 	doc.html(_el as HTMLElement, {
	// 		html2canvas: {
	// 			width: 302,
	// 		},
	// 		callback: doc => {
	// 			// print(doc);
	// 			if (save) doc.save('download-file');
	// 			resolve(doc);
	// 			// (el as HTMLElement)?.classList.remove('printing');
	// 		},
	// 		x: 0,
	// 		y: 0,
	// 		width: 80,
	// 		// width: 80, //target width in the PDF document
	// 		windowWidth: 300, //window width in CSS pixels
	// 	});
	// });
}

export async function send2printer(blob: Blob) {
	// const url = "http://localhost:3030/file";
	const get_url = "https://10.99.77.247:5012/api/Print";
	const url =
		"https://10.99.77.247:5012/api/Print?printerName=Microsoft Print to PDF";
	console.clear();
	const data = new FormData();
	data.append("file", blob, "file.pdfلأ");

	const get = await fetch(get_url, {
		method: "GET",
		// mode: "no-cors",
		// headers: {
		// 	"Content-Type": "application/json",
		// },
	}).then(r => r.json());

	console.log(get);

	const post = await fetch(url, {
		method: "POST",
		body: data,
		// 	mode: "no-cors",
	}).then(r => r.json());
	console.log(post);
}
