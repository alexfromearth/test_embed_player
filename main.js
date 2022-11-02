import './style.css'
import artecLogo from './artecLogo.svg'

let savedTextareaValue = '';

const MainLogo = `
    <a href="https://staging-cloud.artec3d.com/" target="_blank">
      <img src="${artecLogo}" class="logo" alt="Artec Cloud logo" />
    </a>
`

const startHTML = `
  <div>
    ${MainLogo}
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
const changeBackgroundBtn = document.getElementById('change-background');
const appWrapper = document.querySelector('.wrapper');
const backgroundInput = document.getElementById('background-input');
const openStartScreen = (rootNode) => {
  rootNode.innerHTML = startHTML;
  getTextArea().value = savedTextareaValue;
  getAddEmbedButton().addEventListener('click', onAddEmbedClick)
  changeBackgroundBtn.addEventListener('click', onChangeBackgroundBtnClick)
}

const getBase64Image = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    resolve(reader.result);
  };
  reader.onerror = function (error) {
    reject(error);
  };
})

function onChangeBackgroundBtnClick() {
  backgroundInput.click();
}

function onAddEmbedClick() {
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

  embedWrapper.innerHTML = MainLogo;
  embedWrapper.appendChild(iframeWrapper);
  embedWrapper.appendChild(deleteEmbedButton);

  rootNode.innerHTML = '';
  rootNode.appendChild(embedWrapper);
}

function onBackgroundInputChange(event) {
  const [file] = event.target.files;

  getBase64Image(file).then(dataUrl => {
    appWrapper.style.backgroundImage = `url(${dataUrl})`
  })
}

backgroundInput.addEventListener('change', onBackgroundInputChange)
openStartScreen(getRootNode());




