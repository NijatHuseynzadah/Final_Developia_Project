const userData = JSON.parse(localStorage.getItem('users')) || [];

function findUserById(userId) {
    return userData.find(user => user.id === parseInt(userId)) || null;
}

function findCompById(compId) {
    return userData.flatMap(user => user.comps || []).find(comp => comp.id !== undefined && comp.id === parseInt(compId)) || null;
}

function loadContentForTab(tabPaneType) {
    $('#shopTabSwitchSpinner').show();

    return new Promise(resolve => {
        setTimeout(() => {
            $('#shopTabSwitchSpinner').hide();

            let compsHtml = '';

            userData.forEach(user => {
                if (user.comps) {
                    user.comps.forEach(comp => {
                        if (tabPaneType && comp.mark && tabPaneType.toUpperCase() === comp.mark.toUpperCase()) {
                            const selectedUser = findUserById(user.id);
                            const userPhone = selectedUser ? selectedUser.phone || 'N/A' : 'N/A';

                            compsHtml += `<div class="computer pb-4 col">
                                <img class="imgComps mt-2" src="${comp.photo}" alt="comp">
                                <p class="mx-3 mb-0">Name: ${comp.name}</p>
                                <p class="mx-3 mb-0">Overview: ${comp.overview}</p>
                                <p class="mx-3 mb-0">Price: ${comp.price}</p>
                                <p class="mx-3 mb-0">New: ${comp.new}</p>
                                <p class="mx-3 mb-0">Phone: ${userPhone}</p>
                                <button class="btn btn-primary moreButton" data-bs-toggle="modal" data-bs-target="#shopMoreModal" data-id="${comp.id}" id="button1">More</button>
                            </div>`;
                        }
                    });
                }
            });

            const tabPane = $(`#${tabPaneType}`);
            tabPane.html(compsHtml || 'There is no computers');

            resolve();
        }, 1000);
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        const tabPaneType = this.getAttribute('data-bs-target').substring(1);
        loadContentForTab(tabPaneType);
    });
});

const firstTabPaneType = document.querySelector('.nav-link').getAttribute('data-bs-target').substring(1);
loadContentForTab(firstTabPaneType);

$(document).on('click', '#shopV-pills-tabContent', function (e) {
    const target = e.target;

    if (target.classList.contains('moreButton')) {
        const compId = target.getAttribute('data-id');
        const selectedComp = findCompById(compId);
        const userId = target.getAttribute('data-id');
        const selectedUser = findUserById(userId);

        if (selectedComp) {
            const modalBody = $('#shopMoreModalBody');

            modalBody.html(`
                <img src="${selectedComp.photo || ''}" alt="comp" class="size">
                <p>Name: ${selectedComp.name || 'N/A'}</p>
                <p>Overview: ${selectedComp.overview || 'N/A'}</p>
                <p>Price: ${selectedComp.price || 'N/A'}</p>
                <p>Phone: ${selectedUser ? selectedUser.phone || 'N/A' : 'N/A'}</p>
                <p>ROM: ${selectedComp.ROM || 'N/A'}</p>
                <p>RAM: ${selectedComp.RAM || 'N/A'}</p>
                <p>Memory type: ${selectedComp.typeOfMemory || 'N/A'}</p>
                <p>Processor: ${selectedComp.processor || 'N/A'}</p>
                <p>System: ${selectedComp.system || 'N/A'}</p>
                <p>Video Card: ${selectedComp.videoCart || 'N/A'}</p>
            `);
        }
    }
});

$('#shopSearchInput').on('keyup', function (event) {
    if (event.key === 'Enter') {
        let searchText = $(this).val().toUpperCase();

        $('.nav-link').each(function () {
            let tabPaneId = $(this).attr('data-bs-target');
            let tabPane = $(tabPaneId);

            if (tabPane.length > 0) {
                let tabPaneType = tabPaneId.substring(1);
                if (tabPaneType.toUpperCase() === searchText) {
                    $(this).tab('show');
                    return false;
                }
            }
        });
    }
});
