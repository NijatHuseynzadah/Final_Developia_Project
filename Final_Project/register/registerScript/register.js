let users = [
  {
    name: 'u1',
    password: 'p1',
    phone: '000-000-0000',
    comps: [
      {
        id: 1,
        mark: 'Acer',
        name: 'acer1',
        price: 123,
        overview: 'tuf dash f15',
        new: 'Yes!',
        photo: 'https://www.notebookcheck-ru.com/fileadmin/Notebooks/Acer/Aspire_E5-553G-109A/4zu3_Acer_Aspire_E5_553G_Teaser.jpg',
        RAM: '12',
        prosessor: 'core i7',
        ROM: '12',
        typeOfMemory: 'HDD',
        system: 'win 11',
        videoCart: '12'
      },
    ],
  },
];

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users))
}

$(".place").on("input", function () {
  if (
    $("#name").val().length >= 2 &&
    $("#password").val().length >= 2 &&
    $("#check").is(":checked")
  ) {
    $("#submit").attr("disabled", false);
  } else {
    $("#submit").attr("disabled", true);
  }
});

$("#check").click(function () {
  if (
    $("#name").val().length >= 2 &&
    $("#password").val().length >= 2 &&
    $("#check").is(":checked")
  ) {
    $("#submit").attr("disabled", false);
  } else {
    $("#submit").attr("disabled", true);
  }
});

$("#submit").click(function (event) {
  event.preventDefault();

  users = JSON.parse(localStorage.getItem('users')) || [];

  let newUser = {
    name: $('#name').val(),
    password: $('#password').val(),
    phone: $('#phone').val(),
    comps: []
  }

  let alreadyExist = users && users.some(user => user.name === newUser.name);

  if (alreadyExist) {
    alert('This is already registered!')
    $('#name').css({
      'outline-color': 'red',
      'border-color': 'red'
    })
  } else {
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
  }
});
