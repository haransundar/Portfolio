import React from 'react';
import { SiPython, SiReact } from 'react-icons/si';

const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Issued Jun 2025 · Expires Jun 2028',
    credentialId: '455c42fdc8c641a3afd4de528cc1c40c',
    logo: <SiReact className="text-orange-500" />,
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    borderColor: 'border-orange-300 dark:border-orange-700',
    link: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/455c42fdc8c641a3afd4de528cc1c40c',
    skills: ['Amazon Web Services (AWS)', 'Amazon EC2', 'Amazon S3'],
  },
  {
    name: 'Python for Data Science',
    issuer: 'NPTEL',
    date: 'Issued Apr 2025',
    credentialId: 'NPTEL25CS60S444500146',
    logo: <SiPython className="text-yellow-500" />,
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
    link: 'https://internalapp.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS60S44450014601281047',
  },
  {
    name: 'Become 100% Confident RPA UiPath Developer - Build 8 Projects',
    issuer: 'Udemy',
    date: 'Issued Mar 2025',
    credentialId: 'UC-2a7b551f-7ce6-4adc-bc9b-a6e4566ae740',
    logo: <SiReact className="text-purple-500" />,
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    borderColor: 'border-purple-300 dark:border-purple-700',
    link: 'https://www.udemy.com/certificate/UC-2a7b551f-7ce6-4adc-bc9b-a6e4566ae740/',
  },
  {
    name: 'Ethical Hacker',
    issuer: 'Cisco Networking Academy',
    date: 'Issued Mar 2025',
    credentialId: '58f04da2-0ff9-4140-a8e8-be478513d735',
    logo: <SiReact className="text-blue-600" />,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-300 dark:border-blue-700',
    link: 'https://www.netacad.com/certificates?issuanceId=58f04da2-0ff9-4140-a8e8-be478513d735',
  },
  {
    name: 'RPA Basics and Introduction to UiPath',
    issuer: 'UiPath (Coursera)',
    date: 'Issued Mar 2025',
    credentialId: 'QVUADGV2XY7E',
    logo: <SiReact className="text-blue-500" />,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-300 dark:border-blue-700',
    link: 'https://www.coursera.org/account/accomplishments/verify/QVUADGV2XY7E',
  },
  {
    name: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'Issued Feb 2025',
    credentialId: 'a5baf521-9046-474a-b28d-6811368ddd6b',
    logo: <SiReact className="text-blue-600" />,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-300 dark:border-blue-700',
    link: 'https://www.netacad.com/certificates?issuanceId=a5baf521-9046-474a-b28d-6811368ddd6b',
  },
  {
    name: 'Design Thinking for Beginners',
    issuer: 'Great Learning',
    date: 'Issued Feb 2024',
    credentialId: 'KEGIXTHC',
    logo: <SiReact className="text-green-600" />,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    borderColor: 'border-green-300 dark:border-green-700',
    link: 'https://www.mygreatlearning.com/certificate/KEGIXTHC',
  },
  {
    name: 'AI For India 2.0',
    issuer: 'HCL GUVI',
    date: 'Issued Aug 2023',
    credentialId: 'bw697k12Mtv0q06o70',
    logo: <SiReact className="text-orange-500" />,
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    borderColor: 'border-orange-300 dark:border-orange-700',
    link: 'https://www.guvi.in/verify-certificate?id=bw697k12Mtv0q06o70',
  },
  {
    name: 'Data Science Foundations',
    issuer: 'Great Learning',
    date: 'Issued Dec 2022',
    credentialId: 'GNMAKUOO',
    logo: <SiReact className="text-green-600" />,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    borderColor: 'border-green-300 dark:border-green-700',
    link: 'https://www.mygreatlearning.com/certificate/GNMAKUOO',
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="mb-16 sm:mb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Certifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {certifications.map((cert, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-4 sm:p-6 flex flex-col transition-all duration-300 hover:scale-105 transform">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${cert.bgColor} border ${cert.borderColor} group-hover:scale-110 transition-transform duration-200`}>
                <div className="text-lg sm:text-xl">
                  {cert.logo}
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">{cert.name}</h3>
                <p className="text-blue-700 dark:text-blue-400 font-medium text-xs sm:text-sm">{cert.issuer}</p>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">{cert.date}</p>
            <p className="text-gray-700 dark:text-gray-300 text-xs mb-2">Credential ID: {cert.credentialId}</p>
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline text-xs sm:text-sm font-medium mb-2 transition-colors">Show credential</a>
            {cert.skills && (
              <div className="flex flex-wrap gap-1 mt-2">
                {cert.skills.map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-800/30 dark:to-purple-800/30 text-blue-700 dark:text-blue-200 rounded text-xs font-semibold border border-blue-200 dark:border-blue-700">{skill}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 