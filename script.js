const btnBookmark = document.querySelector('.btn-bookmark');
const buttonText = document.querySelector('span');
const btnBackgroundImg = document.getElementById('bookmark');
const backProjectCard = document.querySelector('.back-this-project');
const backProjectBtn  = document.querySelector('.btn');
const overlay = document.querySelector('.overlay')
const closeBtn = document.getElementById('close-btn');
const thankYouCard = document.querySelector('.thank-you-card');
const thankYouBtn = document.getElementById('pledge-acceptance');
const daysAmtLeft = document.querySelector('.days-left-amt');
const errorDisplay = document.querySelector('hidden');

const MAX_LENGTH = 5;
let pledgeInputBtn = null;


const _createHTMLPledge = function() {
    return `
      <div class="enter-pledge-container">
        <div style="">Enter your pledge</div>
        <div class="input-pledge-contianer">
        <form onsubmit="handleSubmit(event)">
            <label for="pledge-input" class="label-error hidden">Enter a valid positive number</label>
            <input id="pledge-input" type="number" oninput="handleInput(this.value)">
            <button>Continue</button>
        </form>
        </div>
      </div>`;
};

const _returnToMain = function() {
    backProjectCard.classList.add('hidden');
    overlay.classList.add('hidden');
}

const _returnBackCardToNorm = function(container) {
    container.style.borderRadius = '8px';
    container.style.borderBottom = "1px solid black";
}

const _addPledgeAmount = function(container) {
        container.style.borderRadius = 'initial';
        container.style.borderBottom = "1px solid rgb(206, 217, 216)";
}

const _dealWithBookmarked = function() {
    buttonText.textContent = 'Bookmarked';
    btnBookmark.style.minWidth = '11rem'; 
    btnBackgroundImg.style.filter = 'contrast(400%)';
    btnBookmark.style.background = 'hsl(0, 0%, 90%)';
}


const _dealWithUnBookmark = function() {
    buttonText.textContent = 'Bookmark';
    btnBookmark.style.minWidth = '10rem';
    btnBackgroundImg.style.filter = 'none';
    btnBookmark.style.filter = 'none';
}

const _showAmtLeft = function() {
    let totalAmountBacked = document.querySelector(".amount-backed h1").textContent;
    let goalAmountBacked = document.getElementById("goal-backed").textContent;
    totalAmountBacked = parseInt(totalAmountBacked.slice(1, totalAmountBacked.length));
    goalAmountBacked = parseInt(goalAmountBacked.slice(1, goalAmountBacked.length));

    const ratio = `${(totalAmountBacked / goalAmountBacked)*100}%`;
    daysAmtLeft.style.width = ratio;
}

_showAmtLeft();



btnBookmark.addEventListener('click', function() {
    const buttonText = document.querySelector('span');
    if (buttonText.textContent === 'Bookmark') {
        _dealWithBookmarked();
    } else {
        _dealWithUnBookmark();
    }
});


backProjectBtn.addEventListener('click', function () {
    if (backProjectCard.style.display === 'flex') {
        backProjectCard.style.display = 'none';
    } else {
        backProjectCard.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }


    const containerList = document.querySelectorAll('.pledges-container > div');
    let addedHTML = null;
    let html = _createHTMLPledge();

    containerList.forEach(function(container) {
        const radioInput = container.querySelector('input[type="radio"]');
        const standTextContainer = container.querySelector('#stand-text-container');

        standTextContainer.addEventListener('click', function() {

            // Reset selections and radios to original
            containerList.forEach(function(container) {
                const selection = container.querySelector('input[type="radio"]');
                selection.checked = false;
                _returnBackCardToNorm(container);
            });

            if (addedHTML) {
                addedHTML.remove();
            }

            radioInput.checked = !radioInput.checked;
            container.insertAdjacentHTML('afterend', html);
            _addPledgeAmount(container);
            addedHTML = container.nextElementSibling;

            pledgeInputBtn = document.getElementById('pledge-input');
            pledgeInputBtn.addEventListener('submit', function(value) {
                console.log(`Submitted: ${value}`);
            });
        });
    });
});

closeBtn.addEventListener('click', function() {
    _returnToMain();
});

thankYouBtn.addEventListener('click', function() {
    _returnToMain();
    thankYouCard.classList.add('hidden');
    backProjectCard.classList.remove('overlay');
});



const handleInput = function(value) {
    if (value >= MAX_LENGTH) {
        document.getElementById("pledge-input").value = value.slice(0, MAX_LENGTH);
    } 
}

const handleSubmit = function(event) {
    event.preventDefault();
    const errorLabel = document.querySelector('.label-error');

    var pledgeInput = document.getElementById("pledge-input");
    var userPledge = pledgeInput.value;
    if (userPledge > 0) {
        backProjectCard.classList.add('hidden');
        thankYouCard.classList.remove('hidden');
        errorLabel.classList.add('hidden');
    } else {
        errorLabel.classList.remove('hidden');
    }
    console.log(userPledge); // Output: the value submitted

}




