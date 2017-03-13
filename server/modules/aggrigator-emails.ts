export default models => {
  return new Promise((resolve, reject) => {
    let result = [];
    if (models !== undefined) {
      if (models.length > 0) {
        for (let i = 0; i < models.length; i++) {
          let model = models[i];
          let companyName = model.name;
          if (model !== undefined) {
            if (model.founders !== undefined) {
              let founders = model.founders;
              if (founders.length > 0) {
                for (let j = 0; j < founders.length; j++) {
                  let founder = founders[j];
                  let foundetFirstName: String;
                  let founderLastName: String;
                  let founderFullName: String;
                  let founderPosition: String;
                  if (founder.name !== undefined) {
                    founderFullName = founder.name.split(' ');
                    founderPosition = founder.position;
                    if (founderFullName[0] !== undefined) {
                      foundetFirstName = founderFullName[0];
                    }
                    if (founderFullName[1] !== undefined) {
                      founderLastName = founderFullName[1];
                    }
                  }
                  if (founder.emails !== undefined) {
                    if (founder.emails.length > 0) {
                      let founderEmails = founder.emails;
                      for (let e = 0; e < founderEmails.length; e++) {
                        let founderEmail = founderEmails[e];
                        result.push({
                          'Email': founderEmail,
                          'FirstName': foundetFirstName,
                          'LastName': founderLastName,
                          'Position': founderPosition,
                          'Company Name': companyName
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    resolve(result);
  });
};
