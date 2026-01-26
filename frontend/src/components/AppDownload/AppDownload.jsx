import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
	return (
		<section className="app-download">
			<div className="app-download-inner">
				<div className="download-left">
					<p className="small">For Better Experience Download</p>
					<p className="download-appname">Food Deliverables</p>

					<div className="download-badges">
						<a href="#" aria-label="Download on Play Store" className="badge" rel="noreferrer">
							<img src={assets.play_store} alt="Play Store" />
						</a>
						<a href="#" aria-label="Download on App Store" className="badge" rel="noreferrer">
							<img src={assets.app_store} alt="App Store" />
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AppDownload
