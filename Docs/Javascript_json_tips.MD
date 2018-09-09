
Adding new fields to JSON:

    var esQuery = {'sort':
                          [
                            {"import_date" : "desc"},
                            {"file_date" : "desc"}
                         ]};
    var tempQuery = {'query': {'filtered': {}}};



    var tempQuery = {'query': {'filtered': {}}};

      let q = {term: {['exif.Exif IFD0.Model'] : "CanonS100"}};

      tempQuery.query.filtered.filter = q;
      q = {"match": {"_all": "January"}}
      tempQuery.query.filtered.query = q;


      //Output of tempQuery
      {"query":{"filtered":{"filter":{"term":{"exif.Exif IFD0.Model":"CanonS100"}},"query":{"match":{"_all":"January"}}}}}

