import React from 'react'
import AdobeLogo from './../../assets/company_logos/AdobeLogo.svg'
import AtlassianLogo from './../../assets/company_logos/AtlassianLogo.svg'
import BrazeLogo from './../../assets/company_logos/BrazeLogo.svg'
import GhostLogo from './../../assets/company_logos/GhostLogo.svg'
import HellosignLogo from './../../assets/company_logos/HellosignLogo.svg'
import HubspotLogo from './../../assets/company_logos/HubspotLogo.svg'
import IntercomLogo from './../../assets/company_logos/IntercomLogo.svg'
import MazeLogo from './../../assets/company_logos/MazeLogo.svg'
import OpendoorrLogo from './../../assets/company_logos/OpendoorrLogo.svg'
import TreehouseLogo from './../../assets/company_logos/TreehouseLogo.svg'
import './Companies.css'

const Companies = () => {
  return (
    <div className='companies-class-top'>
    <div className='companies-class'>
        <div className='companies-logo'>
            <div><img src={AdobeLogo} alt="AdobeLogo" /></div>
            <div><img src={BrazeLogo} alt="BrazeLogo" /></div>
            <div><img src={HellosignLogo} alt="HellosignLogo" /></div>
            <div><img src={MazeLogo} alt="MazeLogo" /></div>
            <div><img src={GhostLogo} alt="GhostLogo" /></div>
        </div>
        <div className='companies-logo'>
            <div><img src={AtlassianLogo} alt="AtlassianLogo" /></div>
            <div><img src={TreehouseLogo} alt="TreehouseLogo" /></div>
            <div><img src={IntercomLogo} alt="IntercomLogo" /></div>
            <div><img src={OpendoorrLogo} alt="OpendoorrLogo" /></div>
            <div><img src={HubspotLogo} alt="HubspotLogo" /></div>
        </div>
    </div>

        <p>More than 25+ Startups  around the <br/>
        world trusted Mentor Token.</p>
    </div>
  )
}

export default Companies