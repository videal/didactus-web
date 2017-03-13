export default models => {
  return new Promise((resolve, reject) => {
    let result = [];
    for (let i = 0; i < models.length; i++) {
      let companyName = models[i].name;
      let details = '';
      let hasEmail = false;
      let founder = '';
      let links = '';
      if (models[i].details !== undefined) {
        details = models[i].details;
      }
      if (models[i].founders) {
        for (let j = 0; j < models[i].founders.length; j++) {
          if (models[i].founders[j].emails !== undefined && models[i].founders[j].emails !== []) {
            founder += models[i].founders[j].name + ': ';
            hasEmail = true;
            let emails = '';
            if (models[i].founders[j].emails) {
              for (let e = 0; e < models[i].founders[j].emails.length; e++) {
                emails += models[i].founders[j].emails[e] + ', ';
              }
            }
            founder += ' ' + emails;
          }
        }
        let founders = founder;
        if (models[i].jobs) {
          for (let jo = 0; jo < models[i].jobs.length; jo++) {
            if (hasEmail === true) {
              let jobTitle = '';
              let jobDescription = '';
              let jobSkills = '';
              let jobCompensation = '';
              let foundersString = '';
              if (models[i] !== undefined) {
                if (models[i].jobs !== undefined) {
                  if (models[i].jobs[jo] !== undefined && models[i].jobs[jo] != null) {
                    let lol = models[i].jobs[jo];
                    if (models[i].jobs[jo].jobTitle !== undefined) {
                      jobTitle = models[i].jobs[jo].jobTitle;
                    }
                    if (models[i].jobs[jo].jobDescription !== undefined) {
                      jobDescription = models[i].jobs[jo].jobDescription;
                    }
                    if (models[i].jobs[jo].skills !== undefined) {
                      jobSkills = models[i].jobs[jo].skills;
                    }
                    if (models[i].jobs[jo].compensation !== undefined) {
                      jobCompensation = models[i].jobs[jo].compensation;
                    }
                  }
                };
              }

              if (models[i].links !== undefined) {
                if (models[i].links.length > 0) {
                  for (let lo = 0; lo < models[i].links.length; lo++) {
                    links += models[i].links[lo] + ', ';
                  }
                }
              }
              links = links.substring(0, links.length - 2);
              if (founders !== undefined) {
                foundersString = founders.substring(0, founders.length - 2);
              }
              if (jobTitle !== undefined && jobTitle !== '') {
                if (jobCompensation.toLowerCase().endsWith('available')) {
                  jobCompensation = '';
                  jobSkills = '';
                }
                result.push({
                  'Job Title': jobTitle,
                  'Job Description': jobDescription,
                  'Skills': jobSkills,
                  'Compensation': jobCompensation,
                  'Company Name': companyName,
                  'Founders': foundersString,
                  'Links': links,
                  'Details': details
                });
              }
            }
          }
        }
      }
    }
    resolve(result);
  });
};
