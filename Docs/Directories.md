The Directories is generic feature applicable to organizing content of various types.
Like for example,
Photos has Albums,
Digital Library has Libraries
Contacts has Groups
Financials has Categories (eg Saving Accounts, Credit Cards, Investments etc)

The directory can store only documents of same category. Dont know the usecase for mixed category directories.

There is a ES index called "directories". This only enumerates all directories in one index.
This index should be queried using filter for the field 'category' for directories for a given category such as Photos.

To list the documents in a given directory, the directory and document association should be stored in the document
record itself for best performance.
It is possible that a given document be assigned to more than one Directory. No need to introduce any such restrictions.

The directory information for any document should be added to JSON for metadata in the metadata field.
For example:

`metadata = {
        directory: ['Album 1', 'Another album']
    }
`

This metadata field can have other fields too.

The documents should be searchable by directory. For this the query should return all document that has
the specified directory name in the metadata.

This will be tricky but should be achieved.

The directory 'Unprocessed' should be treated differntly than others. For this directory the documents should be picked
from staged location. This information is available in the storage container called staging which is indexed
in "sm_objectstoreindex_staging".

The question is:
Whether the directory entry in ES specify the storage container to locate all its documents?


Fields for Directories entry:
show_order - optional field to specify the order in which this directory should be displayed. This order is within a given category
category - category of the documents for this directory. Typically photos, digitallibrary, contacts etc.
default_caption - Default caption that will be used for display text when localization translation not available
disp_imageid - Image ID associated with this directory
name - name of the directory
desc - optional field for description
container - The storage container associated with this directory


