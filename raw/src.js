// alert('testing');

console.log('testing');
// import { jsPDF } from './jspdf.es.js';
function generate() {
	let doc = new jsPDF();
	// doc.text('test text', 15, 15);
	// doc.save('out.pdf');
	// let pdf = btoa(doc.output());
	const specialElementHandlers = {
		'#editor': function (element, renderer) {
			return true;
		},
	};
	// doc.html(document.body, {
	// 	callback: doc => _fetch(doc),
	// 	x: 0,
	// 	y: 0,
	// 	width: 80,
	// 	windowWidth: 650,
	// });

	doc.fromHTML(document.body, 0, 0, {
		width: 80,
		elementHandlers: specialElementHandlers,
	});
	doc.save('test.pdf');
}
const url = 'http://localhost:3030/file';

function _fetch(doc) {
	doc.save('test.pdf');
	let data = new FormData();
	data.append('fl', doc.output('blob'));
	fetch(url, { method: 'POST', body: data });
}
function winFileReader(doc) {
	var reader = new window.FileReader();
	reader.readAsDataURL(doc.output('blob'));
	reader.onloadend = function () {
		// method: 'POST',
		// data: {
		//     attachment: reader.result
		// }
	};
}

function _XMLHttpRequest(doc) {
	var data = new FormData();
	data.append('fl', doc.output());
	var xhr = new XMLHttpRequest();
	xhr.open('post', 'http://localhost:3030/file', true);
	xhr.send(data);
}
