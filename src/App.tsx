import './App.css';
import { jsPDF } from 'jspdf';

function pixelsToMM(elId) {
	const el = document.getElementById(elId);
	el.classList.add('printing');
	const width = parseInt(window.getComputedStyle(el, null).width);
	const height = parseInt(window.getComputedStyle(el, null).height);
	const converted = {};

	converted['width'] = Math.floor(width * 0.264583);
	converted['height'] = Math.floor(height * 0.264583);

	console.log(converted.width + ' ' + converted.height);

	return [el, converted.width, converted.height];
}

function App() {
	const url = 'http://localhost:3030/file';

	function save() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [el, _, h] = pixelsToMM('root');
		// console.log(w, h);
		const doc = jsPDF('p', 'mm', [80, h]);
		doc.html(el, {
			callback: doc => {
				_fetch(doc);
				el.classList.remove('printing');
			},
			x: 0,
			y: 0,
			width: 80,
			windowWidth: 368,
		});
	}
	function _fetch(doc) {
		doc.save('test.pdf');
		const data = new FormData();
		data.append('fl', doc.output('blob'));
		fetch(url, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': false,
			},
			method: 'POST',
			body: data,
			mode: 'no-cors',
		});
	}
	return (
		<>
			<h2>HTML Table</h2>

			<table>
				<tbody>
					<tr>
						<th>Company</th>
						<th>Contact</th>
						<th>Country</th>
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
					</tr>
					<tr>
						<td>Centro comercial Moctezuma</td>
						<td>Francisco Chang</td>
						<td>Mexico</td>
					</tr>
					<tr>
						<td>Ernst Handel</td>
						<td>Roland Mendel</td>
						<td>Austria</td>
					</tr>
					<tr>
						<td>Island Trading</td>
						<td>Helen Bennett</td>
						<td>UK</td>
					</tr>
					<tr>
						<td>Laughing Bacchus Winecellars</td>
						<td>Yoshi Tannamuri</td>
						<td>Canada</td>
					</tr>
					<tr>
						<td>Magazzini Alimentari Riuniti</td>
						<td>Giovanni Rovelli</td>
						<td>Italy</td>
					</tr>
				</tbody>
			</table>

			<button onClick={save}>save pdf</button>
		</>
	);
}

export default App;
