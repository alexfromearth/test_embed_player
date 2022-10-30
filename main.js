import './style.css'
import artecLogo from './artecLogo.svg'

let savedTextareaValue = '';
const startHTML = `
  <div>
    <a href="https://staging-cloud.artec3d.com/" target="_blank">
      <img src="${artecLogo}" class="logo" alt="Artec Cloud logo" />
    </a>
    <h1>Hello Artec Cloud QA!</h1>
    <textarea placeholder="Add embed player iframe here" name="iframe text" class="iframe-text"></textarea>
    <div class="card">
      <button id="add-embed" type="button">Add embed player</button>
    </div>
  </div>
`

// helpers
const getRootNode = () => document.querySelector('#app');
const getAddEmbedButton = () => document.getElementById('add-embed');
const getTextArea = () => document.querySelector('.iframe-text');
const getTextAreaValue = () => getTextArea()?.value;
const openStartScreen = (rootNode) => {
  rootNode.innerHTML = startHTML;
  getTextArea().value = savedTextareaValue;
  getAddEmbedButton().addEventListener('click', onAddEmbedClick)
}
const onAddEmbedClick = () => {
  const textAreaValue = getTextAreaValue();

  if (!textAreaValue) return;
  getAddEmbedButton().removeEventListener('click', onAddEmbedClick)

  savedTextareaValue = textAreaValue;

  const rootNode = getRootNode();
  const embedWrapper = document.createElement('div');
  const iframeWrapper = document.createElement('div');
  const deleteEmbedButton = document.createElement('button');

  deleteEmbedButton.textContent = 'Delete embedding';
  embedWrapper.classList.add('embed-wrapper');
  iframeWrapper.innerHTML = textAreaValue;

  const onDeleteEmbedClick = () => {
    openStartScreen(rootNode);

    deleteEmbedButton.removeEventListener('click', onDeleteEmbedClick);
  }

  deleteEmbedButton.addEventListener('click', onDeleteEmbedClick);

  embedWrapper.appendChild(iframeWrapper);
  embedWrapper.appendChild(deleteEmbedButton);

  rootNode.innerHTML = '';
  rootNode.appendChild(embedWrapper);
}

openStartScreen(getRootNode());




