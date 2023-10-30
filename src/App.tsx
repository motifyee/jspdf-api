import "./App.css";
import {
	canvas2blob,
	canvas2pdf,
	el2canvas,
	el2pdf,
	saveCanvasAsImage,
	send2printer,
} from "./scr";

function App() {
	async function save() {
		// let el = document.getElementById('printable')?.cloneNode(true);

		// console.log('run 2');
		// console.log(el);
		// document.getElementById('printable')?.remove();

		const canvas = await el2canvas("printable");
		// saveCanvasAsImage(canvas);
		// let blob = await canvas2blob(canvas);
		// send2printer(blob);
		let pdf = canvas2pdf(canvas, false).output("blob");
		// el2pdf('printable', true);
		send2printer(pdf);
	}

	return (
		<>
			<div className='container'>
				<div id='printable'>
					<h2>بسم الله الرحمن الرحيم</h2>

					<table>
						<tbody>
							<tr>
								<th>n</th>
								<th>Company</th>
								<th>Contact</th>
							</tr>
							{Array(130)
								.fill(0)
								.map((_, e) => (
									<tr key={e}>
										<td>{e}</td>
										<td>Alfreds Futterkiste</td>
										<td>Maria Anders</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
			<button onClick={save}>save pdf</button>
		</>
	);
}

export default App;
