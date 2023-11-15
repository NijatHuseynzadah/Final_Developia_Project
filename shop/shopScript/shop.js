const userData = JSON.parse(localStorage.getItem('users')) || [];

function findUserById(userId) {
    return userData.find(user => user.id === parseInt(userId)) || null;
}

function loadContentForTab(tabPaneType) {
    $('#tabSwitchSpinner').show();

    return new Promise(resolve => {
        setTimeout(() => {
            $('#tabSwitchSpinner').hide();

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
                                <p class="mx-3 mb-0">Overview: ${comp.opinion}</p>
                                <p class="mx-3 mb-0">Price: ${comp.price}</p>
                                <p class="mx-3 mb-0">New: ${comp.new}</p>
                                <p class="mx-3 mb-0">Phone: ${userPhone}</p>
                                <button class="btn btn-primary moreButton" data-bs-toggle="modal" data-bs-target="#moreModal" data-id="${comp.id}" id="button1">More</button>
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

document.querySelectorAll('.moreButton').forEach(btn => {
    btn.addEventListener('click', (event) => {
        const compId = event.target.getAttribute('data-id');
        const selectedComp = findCompById(compId);
        const userId = event.target.getAttribute('data-id');
        const selectedUser = findUserById(userId);

        if (selectedComp) {
            const modalBody = $('#moreModalBody');

            modalBody.html(`<img src="${selectedComp.photo}" alt="comp" class="size">
                <p>Name: ${selectedComp.name}</p>
                <p>Opinion: ${selectedComp.opinion}</p>
                <p>Price: ${selectedComp.price}</p>
                <p>Phone: ${selectedUser ? selectedUser.phone : 'N/A'}</p>
                <p>Memoryfull: ${selectedComp.fullMemory}</p>
                <p>Memorynotfull: ${selectedComp.notFullMemory}</p>
                <p>Memorytype: ${selectedComp.typeOfMemory}</p>
                <p>Processor: ${selectedComp.processor}</p>
                <p>System: ${selectedComp.system}</p>
                <p>Video Card: ${selectedComp.videoCard}</p>`);
        }
    });
});

function findCompById(compId) {
    return userData.flatMap(user => user.comps || []).find(comp => comp.id === parseInt(compId)) || null;
}

$('#searchInput').on('keyup', function (event) {
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

