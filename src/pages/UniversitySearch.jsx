import React, { useState, useMemo } from 'react';
import { 
  Search, 
  GraduationCap,
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  Clock4,
  Euro,
  FileCheck,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  Mail,
  X,
  Clock,
  CalendarDays,
  Check,
  Copy,
  SquareSigma
} from 'lucide-react';

const UniversityTracker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);
  const [showCostsModal, setShowCostsModal] = useState(false);
  const [showDeadlinesModal, setShowDeadlinesModal] = useState(false);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
  
  function getDaysRemaining(dateString) {
    const today = new Date();
    const deadline = new Date(dateString);
    const diffTime = deadline - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  function getAllDeadlines(universities) {
    const allDeadlines = [];
    
    universities.forEach(uni => {
      // Application deadlines
      if (uni.deadline) {
        allDeadlines.push({
          date: uni.deadline,
          university: uni.name,
          program: uni.program,
          description: 'Final Application Deadline',
          requirements: 'All documents must be submitted'
        });
      }

      // Application start
      if (uni.deadline) {
        allDeadlines.push({
          date: uni.starts,
          university: uni.name,
          program: uni.program,
          description: 'Application Start',
          requirements: 'All documents must be submitted'
        });
      }
      
      // Document deadlines
      uni.documents?.forEach(doc => {
        if (doc.deadline && doc.status !== 'ready') {
          allDeadlines.push({
            date: doc.deadline,
            university: uni.name,
            program: uni.program,
            description: `${doc.name} Submission`,
            requirements: doc.requirements || null,
            type: 'document'
          });
        }
      });
  
      // Language test deadlines
      uni.requirements?.languages?.forEach(lang => {
        if (lang.deadline && lang.status !== 'ready') {
          allDeadlines.push({
            date: lang.deadline,
            university: uni.name,
            program: uni.program,
            description: `${lang.name} ${lang.test} Test`,
            requirements: `Minimum level required: ${lang.level}`,
            type: 'language'
          });
        }
      });
    });
  
    return allDeadlines;
  }
  
  function getNextDeadlines(universities, limit = 2) {
    return getAllDeadlines(universities)
      .filter(d => getDaysRemaining(d.date) > 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }
  
  function getNextDeadline(universities) {
    return getNextDeadlines(universities, 1)[0];
  }
  
  function getDeadlinesByTimeframe(universities, maxDays, minDays = 0) {
    return getAllDeadlines(universities)
      .filter(d => {
        const days = getDaysRemaining(d.date);
        return days > minDays && days <= maxDays;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  
  function getCompletedDeadlines(universities) {
    return getAllDeadlines(universities)
      .filter(d => getDaysRemaining(d.date) <= 0)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  


  // Sample data - replace with your actual data
  const universities = [
    {
      id: 1,
      name: 'University of Bremen',
      country: 'germany',
      city: 'Bremen',
      program: 'Biochemistry and Molecular Biology, M.Sc.',
      status: 'applied',
      applicationFee: 0,
      applicationVia: 'moin.uni-bremen.de',
      email: 'mcsbmb@uni-bremen.de',
      website: 'https://www.uni-bremen.de/en/studies/orientation-application/offered-study-program/dbs/study/11?cHash=91c5244f233c0f93f36f97f5cae727f9',
      semesterFee: 350,
      deadline: '2025-01-15',
      documents: [
        { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
        { name: 'CV', status: 'ready', deadline: '2024-12-15' },
        { name: 'Motivation Letter', status: 'ready', deadline: '2024-12-15' },
        { name: 'English C1', status: 'pending', deadline: '2025-3-15' }
      ],
      applicationDetails: {
        appliedDate: '2024-12-30',
        applicationId: '485830',
        status: 'under_review'
      },
      communications: [
        { date: '2024-12-30', type: 'submission', content: 'Application submitted' },
        { date: '2024-12-30', type: 'email', content: 'Confirmation received' }
      ]
    },
    {
        id: 2,
        name: 'University of Göttingen + Max Planck',
        country: 'germany',
        city: 'Göttingen',
        program: 'Molecular Biology, M.Sc./PhD',
        status: 'applied',
        applicationFee: 0,
        applicationVia: 'gpmolbio2.uni-goettingen.de',
        semesterFee: 0,
        website: 'https://www.uni-goettingen.de/en/663793.html',
        email: 'gpmolbio@gwdg.de',
        deadline: '2025-01-15',
        documents: [
          { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
          { name: 'CV', status: 'ready', deadline: '2024-12-15' },
          { name: 'Motivation Letter', status: 'ready', deadline: '2024-12-15' },
          { name: 'English C1', status: 'pending', deadline: '2025-3-15' },
          { name: 'Recommendation letters for Göttingen', status: 'pending', deadline: '2025-1-18' }
        ],
        applicationDetails: {
          appliedDate: '2025-01-01',
          applicationId: 'MB-2025-25055',
          status: 'under_review'
        },
        communications: [
          { date: '2025-01-01', type: 'submission', content: 'Application submitted' },
          { date: '2025-01-01', type: 'email', content: 'Confirmation received' }
        ]
      },
      {
        id: 3,
        name: 'University of science at Potsdam',
        country: 'germany',
        city: 'Potsdam',
        program: 'Biochemistry and Molecular Biology, M.Sc.',
        status: 'planning',
        applicationFee: 30,
        applicationVia: 'uni-assist e.V',
        semesterFee: 281.01,
        website: 'https://www.uni-potsdam.de/en/mnfakul/study-and-teaching/master/biochemistry-and-molecular-biology',
        email: 'tutoribb@uni-potsdam.de',
        deadline: '2025-08-15',
        documents: [
          { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
          { name: 'scientific content', status: 'ready', deadline: '2024-12-15' },
          { name: 'CV in tabular format from', status: 'ready', deadline: '2024-12-15' },
          { name: 'English B2', status: 'pending', deadline: '2025-3-15' },
          { name: 'German A2', status: 'pending', deadline: '2025-6-15' },
        ],
        applicationDetails: {
          appliedDate: '-',
          applicationId: '-',
          status: '-'
        },
        communications: [
        ]
      },
      {
        id: 4,
        name: 'Julius-Maximilians-Universität Würzburg',
        country: 'germany',
        city: 'Würzburg',
        program: 'Biochemistry, M.Sc.',
        status: 'planning',
        applicationFee: 0,
        applicationVia: 'uwgs.cloud.opencampus.net/user/register',
        semesterFee: 162.90,
        website: 'https://www.biozentrum.uni-wuerzburg.de/en/msc-biochemistry/program/',
        email: 'MSc.Biochem@uni-wuerzburg.de',
        starts:'2025-04-01',
        deadline: '2025-06-01',
        documents: [
          { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
          { name: 'Motivation letter', status: 'ready', deadline: '2024-12-15' },
          { name: 'High school certificate', status: 'ready', deadline: '2024-12-15' },
          { name: 'scientific content', status: 'ready', deadline: '2024-12-15' },
          { name: 'Grading System', status: 'ready', deadline: '2024-12-15' },
          { name: 'CV', status: 'ready', deadline: '2024-12-15' },
          { name: 'English B2 ILETS', status: 'pending', deadline: '2025-3-15' },

        ],
        applicationDetails: {
          appliedDate: '-',
          applicationId: '-',
          status: '-'
        },
        communications: [
        ]
      },
      {
        id: 5,
        name: 'University of Bonn',
        country: 'germany',
        city: 'Bonn',
        program: 'Molecular Cell Biology, M.Sc.',
        status: 'planning',
        applicationFee: 0,
        applicationVia: 'uni-bonn.de/en/studying/application-admission-and-enrollment/application-guide',
        semesterFee: 330,
        website: 'https://www.biologie.uni-bonn.de/de/studium/m-sc-mcb',
        email: 'molcellbiol@uni-bonn.de',
        starts:'2025-02-01',
        deadline: '2025-03-31',
        documents: [
          { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
          { name: 'CV', status: 'ready', deadline: '2024-12-15' },
          { name: 'English B2', status: 'pending', deadline: '2025-2-15' },

        ],
        applicationDetails: {
          appliedDate: '-',
          applicationId: '-',
          status: '-'
        },
        communications: [
        ]
      },
      ,
      {
        id: 6,
        name: 'University of Bonn',
        country: 'germany',
        city: 'Bonn',
        program: 'Biochemistry, M.Sc.',
        status: 'planning',
        applicationFee: 0,
        applicationVia: 'uni-bonn.de/en/studying/application-admission-and-enrollment/application-guide',
        semesterFee: 330,
        website: 'https://www.biologie.uni-bonn.de/de/studium/m-sc-mcb',
        email: 'molcellbiol@uni-bonn.de',
        starts:'NAN',
        deadline: '2025-04-30',
        documents: [
          { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
          { name: 'CV', status: 'ready', deadline: '2024-12-15' },
          { name: 'English B2 Uni-certificate', status: 'ready', deadline: '2025-2-15' },
          { name: 'aptitude test', status: 'pending', deadline: '2025-4-30' },

        ],
        applicationDetails: {
          appliedDate: '-',
          applicationId: '-',
          status: '-'
        },
        communications: [
        ]
      }
      ,
      {
        id: 7,
        name: 'Dresden University of Technology',
        country: 'germany',
        city: 'Dresden',
        program: 'Biochemistry, M.Sc.',
        status: 'planning',
        applicationFee: 30,
        applicationVia: 'uni-assist.de',
        semesterFee: 290,
        website: 'https://tu-dresden.de/studium/vor-dem-studium/studienangebot/sins/sins_studiengang?autoid=30058&set_language=en',
        email: 'servicecenter.studium@tu-dresden.de',
        starts:'2025-04-15',
        deadline: '2025-06-15',
        documents: [
          { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
          { name: 'CV', status: 'ready', deadline: '2024-12-15' },
          { name: 'English B2 Uni-certificate', status: 'ready', deadline: '2025-2-15' },

        ],
        applicationDetails: {
          appliedDate: '-',
          applicationId: '-',
          status: '-'
        },
        communications: [
        ]
      }
      ,
      {
        id: 8,
        name: 'University of Göttingen',
        country: 'germany',
        city: 'Göttingen',
        program: 'Computational Biology and Bioinformatics, M.Sc.',
        status: 'pending',
        applicationFee: 0,
        applicationVia: 'https://upload2.uni-goettingen.de/Bewerberportal/upload',
        semesterFee: 400,
        website: 'https://www.uni-goettingen.de/de/computational+biology+and+bioinformatics+%28m.sc.%29/657628.html',
        email: 'studienberatung@biologie.uni-goettingen.de',
        starts:'2025-01-1',
        deadline: '2025-02-15',
        documents: [
          { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
          { name: 'CV', status: 'ready', deadline: '2024-12-15' },
          { name: 'English B2 Uni-certificate', status: 'ready', deadline: '2025-2-15' },
          { name: 'content description', status: 'ready', deadline: '2025-2-15' },
        ],
        applicationDetails: {
          appliedDate: '2025-01-3',
          applicationId: '829-20252-1340',
          status: 'issue_while_submit_documents'
        },
        communications: [
          { date: '2025-01-03', type: 'submission', content: 'Application submitted' },
          { date: '2025-01-03', type: 'email', content: 'Confirmation received asking to upload documents in portal' },
          { date: '2025-01-03', type: 'email', content: 'document uploading failed' },
          { date: '2025-01-03', type: 'email', content: 'send two emails about the document uploading failure' }
        ]
      }
      ,
      {
        id: 9,
        name: 'Saarland University',
        country: 'germany',
        city: 'Saarbrücken',
        program: 'Computational Biology and Bioinformatics, M.Sc.',
        status: 'applied',
        applicationFee: 0,
        applicationVia: 'https://oas.cs.uni-saarland.de/SubmitPaper.php',
        semesterFee: 361.9,
        website: 'https://www.uni-saarland.de/en/study/programmes/master/bioinformatics.html',
        email: 'olga.Kalinina(at)helmholtz-hips.de',
        starts:'2025-01-1',
        deadline: '2025-5-15',
        documents: [
          { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
          { name: 'CV', status: 'ready', deadline: '2024-12-15' },
          { name: 'Motivation letter', status: 'ready', deadline: '2024-12-15' },
          { name: 'English C1', status: 'ready', deadline: '2024-12-15' },
          { name: 'Two recommendation letters/Ash-Ade', status: 'pending', deadline: '2025-5-01' },
        ],
        applicationDetails: {
          appliedDate: '2025-01-3',
          applicationId: 'NaN',
          status: 'under_review'
        },
        communications: [
          { date: '2025-01-03', type: 'submission', content: 'Documents uploaded waiting references' },
          { date: '2025-01-03', type: 'email', content: 'send email seeking clarifications' }
        ]
      }
      ,
      {
        id: 10,
        name: 'Heinrich Heine University Düsseldorf',
        country: 'germany',
        city: 'Düsseldorf',
        program: 'Biochemistry International, M.Sc.',
        status: 'planning',
        applicationFee: 0,
        applicationVia: 'https://digstu.hhu.de/qisserver/pages/cs/sys/portal/hisinoneStartPage.faces',
        semesterFee: 300,
        website: 'https://www.biochemiestudium.hhu.de/en/translate-to-english-biochemistry-international',
        email: 'StuKoBiochemie@hhu.de',
        starts:'2025-08-1',
        deadline: '2025-9-15',
        documents: [
          { name: 'Graduation Certificate', status: 'pending', deadline: '2025-9-1' },
        ],
        applicationDetails: {
          appliedDate: '2025-01-3',
          applicationId: 'NaN',
          status: ''
        },
        communications: [        ]
      },
      {
        id: 11,
        name: 'Universita\' di Genova',
        country: 'italy',
        city: 'Genova',
        program: 'MEDICAL-PHARMACEUTICAL BIOTECHNOLOGY, M.Sc.',
        status: 'applied',
        applicationFee: 0,
        applicationVia: 'https://servizionline.unige.it/web-studenti2/en/#/v2/preimma/td/5005/anac/2025',
        email: 'enrico.zeraschi@unige.it',
        website: 'https://corsi.unige.it/en/corsi/10598/',
        semesterFee: 300,
        deadline: '2025-03-14',
        starts:  '2025-11-18',
        documents: [
          { name: 'Transcript', status: 'ready', deadline: '2024-12-15' },
          { name: 'CV', status: 'ready', deadline: '2024-12-15' },
          { name: 'Motivation Letter', status: 'ready', deadline: '2024-12-15' },
          { name: 'English C1', status: 'ready', deadline: '2024-12-15' }
        ],
        applicationDetails: {
          appliedDate: '2025-01-10',
          applicationId: '8282110',
          status: 'under_review'
        },
        communications: [
          { date: '2025-01-10', type: 'submission', content: 'Application submitted' },
          { date: '2025-01-10', type: 'email', content: 'Confirmation received' }
        ]
      },
      
      

  ];

  const countryInfo = {
    germany: {
      name: 'Germany',
      icon: '🇩🇪',
      keyFacts: [
        { title: 'Application Period', content: 'Winter: Dec-Jan, Summer: Jun-Jul' },
        { title: 'Blocked Account', content: '€11,208 (2024)' },
        { title: 'Health Insurance', content: '~€110/month' },
        { title: 'Language', content: 'Usually B2/C1 German or English' },
        { title: 'Visa Cost', content: '€75' }
      ]
    },
    austria: {
      name: 'Austria',
      icon: '🇦🇹',
      keyFacts: [
        { title: 'Application Period', content: 'Winter: Jan-Mar, Summer: Jul-Sep' },
        { title: 'Blocked Account', content: '€11,928 (2024)' },
        { title: 'Health Insurance', content: '~€65/month' },
        { title: 'Language', content: 'B2 German or English (program dependent)' },
        { title: 'Visa Cost', content: '€160' }
      ]
    },
    russia: {
      name: 'Russia',
      icon: '🇷🇺',
      keyFacts: [
        { title: 'Application Period', content: 'Jun-Jul for most universities' },
        { title: 'Financial Proof', content: '~€3,000/year' },
        { title: 'Health Insurance', content: '€150-200/year' },
        { title: 'Language', content: 'B2 Russian or English (varies by program)' },
        { title: 'Visa Cost', content: '€35' }
      ]
    },
    italy: {
      name: 'Italy',
      icon: '🇮🇹',
      keyFacts: [
        { title: 'Application Period', content: 'Early Bird: Feb-Apr, Regular: May-Jul' },
        { title: 'Financial Proof', content: '€6,079.45/year (2024)' },
        { title: 'Health Insurance', content: '€150/year' },
        { title: 'Language', content: 'B2 Italian or English (program specific)' },
        { title: 'Visa Cost', content: '€50' }
      ]
    },
    
};

  // Calculate statistics
  const stats = useMemo(() => {
    const allDeadlines = universities.flatMap(uni => 
      uni.documents.map(doc => ({ ...doc, university: uni.name }))
    ).filter(doc => doc.status === 'pending');

    const upcomingDeadlines = allDeadlines
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 5);

    return {
      applications: {
        applied: universities.filter(u => u.status === 'applied').length,
        accepted: universities.filter(u => u.status === 'accepted').length,
        rejected: universities.filter(u => u.status === 'rejected').length,
        pending: universities.filter(u => u.status === 'pending').length,
        planning: universities.filter(u => u.status === 'planning').length
      },
      documents: {
        ready: universities.reduce((acc, uni) => 
          acc + uni.documents.filter(d => d.status === 'ready').length, 0),
        pending: universities.reduce((acc, uni) => 
          acc + uni.documents.filter(d => d.status === 'pending').length, 0),
        total: universities.reduce((acc, uni) => 
          acc + uni.documents.length, 0)
      },
      upcomingDeadlines,
      totalInvestment: universities.reduce((acc, uni) => 
        acc + uni.applicationFee + uni.semesterFee, 0)
    };
  }, [universities]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Application Stats Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Applications</h3>
            
            <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <SquareSigma className="h-5 w-5 text-black-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-black-600">
                    {stats.applications.applied + stats.applications.rejected + stats.applications.planning
                    + stats.applications.pending}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Clock4 className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Applied</p>
                  <p className="text-xl font-bold text-blue-600">{stats.applications.applied}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Accepted</p>
                  <p className="text-xl font-bold text-green-600">{stats.applications.accepted}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-xl font-bold text-red-600">{stats.applications.rejected}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-xl font-bold text-yellow-600">{stats.applications.pending}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Stats Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Documents</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <FileCheck className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ready Documents</p>
                  <p className="text-xl font-bold text-emerald-600">
                    {stats.documents.ready}/{stats.documents.total}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-emerald-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(stats.documents.ready / stats.documents.total) * 100}%` }}
                />
              </div>
            </div>
          </div>


          {/* Deadlines Overview Card with Modal */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
              <button 
                onClick={() => setShowDeadlinesModal(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View Timeline
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <CalendarClock className="h-5 w-5 text-orange-500" />
              </div>

              <div>
                    <p className="text-sm text-gray-600">Next Deadline</p>
                    {getNextDeadline(universities) ? (
                        <>
                        <p className="text-xl font-bold text-orange-600">
                            {formatDate(getNextDeadline(universities).date)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {getNextDeadline(universities).description}
                        </p>
                        </>
                    ) : (
                        <p className="text-sm text-gray-500">No upcoming deadlines</p>
                    )}
                    </div>

            </div>

            {/* Deadlines Modal */}
            {showDeadlinesModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Deadlines Timeline</h2>
                    <button 
                      onClick={() => setShowDeadlinesModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Timeline Sections */}
                  <div className="space-y-8">
                    {/* Urgent Deadlines (within 30 days) */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1 bg-red-50 rounded">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <h3 className="font-semibold text-red-600">Urgent (Next 30 Days)</h3>
                      </div>
                      <div className="space-y-3">
                        {getDeadlinesByTimeframe(universities, 30).map((deadline, index) => (
                          <div key={index} className="flex items-start gap-4 pl-4">
                            <div className="min-w-[100px] text-sm font-medium">
                              {formatDate(deadline.date)}
                            </div>
                            <div>
                              <p className="font-medium">{deadline.university}</p>
                              <p className="text-sm text-gray-600">{deadline.description}</p>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium ml-auto
                              ${getDaysRemaining(deadline.date) <= 7 ? 'bg-red-100 text-red-700' : 
                                'bg-orange-100 text-orange-700'}`}>
                              {getDaysRemaining(deadline.date)} days left
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Deadlines (1-3 months) */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1 bg-yellow-50 rounded">
                          <Clock className="h-5 w-5 text-yellow-500" />
                        </div>
                        <h3 className="font-semibold text-yellow-600">Upcoming (1-3 Months)</h3>
                      </div>
                      <div className="space-y-3">
                        {getDeadlinesByTimeframe(universities, 90, 30).map((deadline, index) => (
                          <div key={index} className="flex items-start gap-4 pl-4">
                            <div className="min-w-[100px] text-sm font-medium">
                              {formatDate(deadline.date)}
                            </div>
                            <div>
                              <p className="font-medium">{deadline.university}</p>
                              <p className="text-sm text-gray-600">{deadline.description}</p>
                            </div>
                            <div className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium ml-auto">
                              {getDaysRemaining(deadline.date)} days left
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Future Deadlines (3+ months) */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1 bg-blue-50 rounded">
                          <CalendarDays className="h-5 w-5 text-blue-500" />
                        </div>
                        <h3 className="font-semibold text-blue-600">Future (3+ Months)</h3>
                      </div>
                      <div className="space-y-3">
                        {getDeadlinesByTimeframe(universities, Infinity, 90).map((deadline, index) => (
                          <div key={index} className="flex items-start gap-4 pl-4">
                            <div className="min-w-[100px] text-sm font-medium">
                              {formatDate(deadline.date)}
                            </div>
                            <div>
                              <p className="font-medium">{deadline.university}</p>
                              <p className="text-sm text-gray-600">{deadline.description}</p>
                            </div>
                            <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium ml-auto">
                              {getDaysRemaining(deadline.date)} days left
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Completed Deadlines */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-1 bg-green-50 rounded">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <h3 className="font-semibold text-green-600">Completed</h3>
                      </div>
                      <div className="space-y-3">
                        {getCompletedDeadlines(universities).map((deadline, index) => (
                          <div key={index} className="flex items-start gap-4 pl-4 opacity-75">
                            <div className="min-w-[100px] text-sm font-medium">
                              {formatDate(deadline.date)}
                            </div>
                            <div>
                              <p className="font-medium">{deadline.university}</p>
                              <p className="text-sm text-gray-600">{deadline.description}</p>
                            </div>
                            <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium ml-auto">
                              Completed
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Calendar Export Option */}
                  <div className="mt-8 pt-6 border-t">
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      <Calendar className="h-4 w-4" />
                      <span>Export to Calendar</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Investment Overview Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Application Costs</h3>
              <button 
                onClick={() => setShowCostsModal(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View Details
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Euro className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Application Spending</p>
                <p className="text-xl font-bold text-purple-600">
                  €{universities.reduce((sum, uni) => 
                    sum + (uni.status === 'applied' ? uni.applicationFee : 0), 0)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {universities.filter(uni => uni.status === 'applied').length} applications submitted
                </p>
              </div>
            </div>

            {/* Costs Modal */}
            {showCostsModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Costs Breakdown</h2>
                    <button 
                      onClick={() => setShowCostsModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Receipt-style breakdown */}
                  <div className="space-y-6">
                    {/* Paid Applications Section */}
                    <div className="border-b pb-4">
                      <h3 className="font-medium mb-3">Paid Applications</h3>
                      {universities
                        .filter(uni => uni.status === 'applied')
                        .map(uni => (
                          <div key={uni.id} className="flex justify-between items-center py-1">
                            <span className="text-gray-600">{uni.name}</span>
                            <span className="font-medium">€{uni.applicationFee}</span>
                          </div>
                        ))}
                      <div className="flex justify-between items-center pt-2 mt-2 border-t">
                        <span className="font-medium">Total Paid</span>
                        <span className="font-bold">€{universities.reduce((sum, uni) => 
                          sum + (uni.status === 'applied' ? uni.applicationFee : 0), 0)}</span>
                      </div>
                    </div>

                    {/* Planned Applications Section */}
                    <div className="border-b pb-4">
                      <h3 className="font-medium mb-3">Planned Applications</h3>
                      {universities
                        .filter(uni => uni.status !== 'applied')
                        .map(uni => (
                          <div key={uni.id} className="flex justify-between items-center py-1">
                            <span className="text-gray-600">{uni.name}</span>
                            <span className="font-medium">€{uni.applicationFee}</span>
                          </div>
                        ))}
                      <div className="flex justify-between items-center pt-2 mt-2 border-t">
                        <span className="font-medium">Total Planned</span>
                        <span className="font-bold">€{universities.reduce((sum, uni) => 
                          sum + (uni.status !== 'applied' ? uni.applicationFee : 0), 0)}</span>
                      </div>
                    </div>

                    {/* Semester Fees Comparison */}
                    <div>
                      <h3 className="font-medium mb-3">Semester Fees Comparison</h3>
                      <div className="space-y-2">
                        {universities
                          .sort((a, b) => a.semesterFee - b.semesterFee)
                          .map(uni => (
                            <div key={uni.id} className="flex items-center gap-2">
                              {
                              console.log(uni.semesterFee)
                              }
                              <div 
                                className="bg-purple-100 h-6 rounded"
                                style={{ 
                                  
                                  minWidth: `${(uni.semesterFee + 15) / 10}%`
                                }}
                              />
                              <span className="text-gray-600 min-w-[200px]">{uni.name}</span>
                              <span className="font-medium">€{uni.semesterFee}/semester</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Additional Costs Note */}
                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                      <h3 className="font-medium mb-2">Additional Costs to Consider</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Blocked Account: ~€11,208 (varies by country)</li>
                        <li>• Health Insurance: €110-150/month</li>
                        <li>• Visa Fees: €75-150</li>
                        <li>• Language Tests: €150-250 per test</li>
                        <li>• Document Translation/Attestation: varies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Country Information (shows only when country is selected) */}
        {selectedCountry && countryInfo[selectedCountry] && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{countryInfo[selectedCountry].icon}</span>
              <h2 className="text-2xl font-semibold">{countryInfo[selectedCountry].name}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryInfo[selectedCountry].keyFacts.map((fact, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm text-gray-600">{fact.title}</span>
                  <span className="text-base font-medium mt-1">{fact.content}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search universities, programs, or cities..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select 
                className="px-4 py-3 border rounded-lg bg-gray-50 min-w-[150px]"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">All Countries</option>
                <option value="germany">Germany</option>
                <option value="italy">Italy</option>
                <option value="austria">Austria</option>
                <option value="russia">Russia</option>

              </select>
              <select 
                className="px-4 py-3 border rounded-lg bg-gray-50 min-w-[150px]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="applied">Applied</option>
                <option value="planning">Planning</option>
                <option value="emailed">Emailed</option>
                <option value="ineligible">Ineligible</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {universities
            .filter(uni => {
              const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  uni.program.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesCountry = !selectedCountry || uni.country === selectedCountry;
              const matchesStatus = !selectedStatus || uni.status === selectedStatus;
              return matchesSearch && matchesCountry && matchesStatus;
            })
            .map(uni => (
              <div key={uni.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{countryInfo[uni.country]?.icon}</span>
                        <span className="text-sm text-gray-600">{uni.city}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{uni.name}</h3>
                      <p className="text-gray-500 text-sm">{uni.program}</p>
                    </div>
                    <div className={`
                      px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5
                      ${uni.status === 'applied' ? 'bg-blue-50 text-blue-700' :
                        uni.status === 'accepted' ? 'bg-green-50 text-green-700' :
                        uni.status === 'rejected' ? 'bg-red-50 text-red-700' :
                        uni.status === 'planning' ? 'bg-purple-100 text-purple-600' :
                        uni.status === 'emailed' ? 'bg-orange-100 text-orange-600' :
                        uni.status === 'ineligible' ? 'bg-slate-100 text-slate-600' :
                        'bg-yellow-50 text-yellow-700'}
                    `}>
                      {uni.status === 'applied' ? <Clock4 className="h-4 w-4" /> :
                       uni.status === 'accepted' ? <CheckCircle2 className="h-4 w-4" /> :
                       uni.status === 'rejected' ? <XCircle className="h-4 w-4" /> :
                       <AlertCircle className="h-4 w-4" />}
                      {uni.status.charAt(0).toUpperCase() + uni.status.slice(1)}
                    </div>
                  </div>

                  {/* Key Information */}
                  <div className="space-y-3 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Application Fee</span>
                      <span className="font-medium">€{uni.applicationFee}</span>
                    </div>

                    <div className="space-y-4">
                      <CopyableField
                        label="Application Via"
                        value={uni.applicationVia}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Semester Fee</span>
                      <span className="font-medium">€{uni.semesterFee}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Application opens in</span>
                      <span className="font-medium">{uni.starts}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Deadline</span>
                      <span className="font-medium">{uni.deadline}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Email</span>
                      <span className="font-medium">{uni.email}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Website</span>
                        <a 
                            href={uni.website}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="font-medium hover:underline text-blue-600"
                        >
                            Link
                        </a>
                        </div>
                  </div>

                  {/* Documents Section */}
                  {expandedCard === uni.id && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="text-sm font-medium mb-3">Documents</h4>
                      <div className="space-y-2">
                        {uni.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm">{doc.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full
                              ${doc.status === 'ready' ? 'bg-green-50 text-green-700' :
                                doc.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                'bg-gray-50 text-gray-700'}
                            `}>
                              {doc.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Application Details for Applied Universities */}
                  {uni.status === 'applied' && uni.applicationDetails && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="text-sm font-medium mb-3">Application Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Applied Date</span>
                          <span className="text-sm">{uni.applicationDetails.appliedDate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Application ID</span>
                          <span className="text-sm font-mono">{uni.applicationDetails.applicationId}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Status</span>
                          <span className="text-sm font-medium text-blue-600">
                            {uni.applicationDetails.status.split('_').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recent Communications */}
                  {uni.communications && expandedCard === uni.id && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="text-sm font-medium mb-3">Recent Communications</h4>
                      <div className="space-y-2">
                        {uni.communications.map((comm, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Mail className="h-4 w-4 mt-0.5 text-gray-400" />
                            <div>
                              <div className="text-sm text-gray-600">{comm.date}</div>
                              <div className="text-sm">{comm.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <button 
                    onClick={() => setExpandedCard(expandedCard === uni.id ? null : uni.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    {expandedCard === uni.id ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Show More
                      </>
                    )}
                  </button>
                  {uni.applicationDetails?.status === 'under_review' && (
                    <span className="text-sm text-blue-600 font-medium">Under Review</span>
                  )}
                </div>
              </div>
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default UniversityTracker;


const CopyableField = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        {copied ? (
          <div className="flex items-center gap-1 text-green-500">
            <Check className="w-4 h-4" />
            <span className="font-medium">Copied!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 hover:bg-gray-100">
          <span 
            onClick={handleCopy}
            className="font-medium  cursor-pointer rounded px-2 py-1 transition-colors"
          >
            Click to copy
          </span>
          <Copy className="w-4 h-4 cursor-pointer" />
      </div>

        )}
      </div>
    </div>
  );
};