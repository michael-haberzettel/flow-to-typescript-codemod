### To setup codemod (from root folder):

`(cd mention-codemods && yarn install)`

### To launch codemod (from root folder):

#### Examples

In specific file with dry mode and output printing:

-   Launch script. Example :

```bash
(ROOT_FOLDER=/home/michael-h/Bureau/src/mention && cd mention-codemods && yarn jscodeshift -t=simple-rename.ts --dry --print --parser=flow --extensions=js,jsx --ignore-pattern='**/src/Mention/WebBundle/Resources/js/vendor' --ignore-pattern='**/src/Mention/WebBundle/Resources/js/__generated__' $ROOT_FOLDER/src/Mention/WebBundle/Resources/js/components/popup/AddTaskPopupImpl.jsx)
```

In all application codebase:

-   Launch script. Example :

```bash
(ROOT_FOLDER=/home/michael-h/Bureau/src/mention && cd mention-codemods && yarn jscodeshift -t=simple-rename.ts --parser=flow --extensions=js,jsx --ignore-pattern='**/src/Mention/WebBundle/Resources/js/vendor' --ignore-pattern='**/src/Mention/WebBundle/Resources/js/__generated__' $ROOT_FOLDER/src/Mention/WebBundle/Resources/js)
```

(ROOT_FOLDER=/home/michael-h/Bureau/src/mention && cd mention-codemods && yarn jscodeshift -t=rename-react-types.ts --parser=flow --extensions=js,jsx --ignore-pattern='**/src/Mention/WebBundle/Resources/js/vendor' --ignore-pattern='**/src/Mention/WebBundle/Resources/js/__generated__' $ROOT_FOLDER/src/Mention/WebBundle/Resources/js)
(ROOT_FOLDER=/home/michael-h/Bureau/src/mention && cd mention-codemods && yarn jscodeshift -t=replace-asterisk.ts --parser=flow --extensions=js,jsx --ignore-pattern='**/src/Mention/WebBundle/Resources/js/vendor' --ignore-pattern='**/src/Mention/WebBundle/Resources/js/__generated__' $ROOT_FOLDER/src/Mention/WebBundle/Resources/js)
(ROOT_FOLDER=/home/michael-h/Bureau/src/mention && cd mention-codemods && yarn jscodeshift -t=remove-generics-from-connect.ts --parser=flow --extensions=js,jsx --ignore-pattern='**/src/Mention/WebBundle/Resources/js/vendor' --ignore-pattern='**/src/Mention/WebBundle/Resources/js/**generated**' $ROOT_FOLDER/src/Mention/WebBundle/Resources/js)
(ROOT_FOLDER=/home/michael-h/Bureau/src/mention && cd mention-codemods && yarn jscodeshift -t=remove-flow-create-selectors-types.ts --parser=flow --extensions=js,jsx --ignore-pattern='**/src/Mention/WebBundle/Resources/js/vendor' --ignore-pattern='**/src/Mention/WebBundle/Resources/js/**generated**' $ROOT_FOLDER/src/Mention/WebBundle/Resources/js)
(ROOT_FOLDER=/home/michael-h/Bureau/src/mention && cd mention-codemods && yarn jscodeshift -t=replace-React.Node-to-Node.ts --parser=flow --extensions=js,jsx --ignore-pattern='**/src/Mention/WebBundle/Resources/js/vendor' --ignore-pattern='**/src/Mention/WebBundle/Resources/js/**generated**' $ROOT_FOLDER/src/Mention/WebBundle/Resources/js)
(ROOT_FOLDER=/home/michael-h/Bureau/src/mention && cd mention-codemods && yarn jscodeshift -t=rename-react-Node-to-ReactNode.ts --parser=flow --extensions=js,jsx --ignore-pattern='**/src/Mention/WebBundle/Resources/js/vendor' --ignore-pattern='**/src/Mention/WebBundle/Resources/js/**generated**' $ROOT_FOLDER/src/Mention/WebBundle/Resources/js)
(ROOT_FOLDER=/home/michael-h/Bureau/src/mention && cd mention-codemods && yarn jscodeshift -t=replace_undescore_generics.ts --parser=flow --extensions=js,jsx --ignore-pattern='**/src/Mention/WebBundle/Resources/js/vendor' --ignore-pattern='**/src/Mention/WebBundle/Resources/js/**generated**' $ROOT_FOLDER/src/Mention/WebBundle/Resources/js)

