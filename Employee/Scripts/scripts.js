editItem = (id) => {
    $(`#row_${id}`).css('border', '1px solid greenyellow');
    $(`#firstName_${id}`).attr('contenteditable', true);
    $(`#lastName_${id}`).attr('contenteditable', true);
    $(`#salary_${id}`).attr('contenteditable', true);
    $(`#manager_${id}`).removeAttr('disabled');
    $(`#saveButton_${id}`).removeAttr('disabled');
}

saveItem = (id) => {
    var data = {
        Id: id,
        firstName: $(`#firstName_${id}`).html(),
        lastName: $(`#lastName_${id}`).html(),
        salary: $(`#salary_${id}`).html(),
        manager: $(`#manager_${id}`).val()
    };

    if (!isNaN(parseFloat(data.salary)) && parseFloat(data.salary) >= 0) {
        $.ajax({
            url: '/api/data',
            data: data,
            type: 'PATCH',
            success: (() => {
                alert('Изменения успешно сохранены!');
                $(`#row_${id}`).css('border', '1px solid black');
                $(`#saveButton_${id}`).attr('disabled', true);
            }),
            error: (() => {
                alert('Ошибка при сохранении изменений!');
                location.reload();
            })
        });
    } else {
        alert('Значение поля "зарплата" должно быть неотрицательным числом!');
        location.reload();
    }

    $(`#firstName_${id}`).removeAttr('contenteditable');
    $(`#lastName_${id}`).removeAttr('contenteditable');
    $(`#salary_${id}`).removeAttr('contenteditable');
    $(`#manager_${id}`).attr('disabled', true);
    $(`#saveButton_${id}`).attr('disabled', true);
    $(`#row_${id}`).css('border', '1px solid black');
}

deleteItem = (id) => {
    $.ajax({
        url: `/api/data/${id}`,
        type: 'DELETE',
        success: (() => {
            console.log('delete success');
            $(`#row_${id}`).remove();
        })
    })
}

toggleCreateForm = () => {
    $('#createFormBlock').fadeToggle(500);
}

$('#createForm').on('submit',
    (source) => {
        source.preventDefault();
        console.log($('#createForm').serialize());
        $.ajax({
            url: '/api/data',
            data: $('#createForm').serialize(),
            type: 'POST',
            success: (() => location.reload()),
            error: (() => alert('Ошибка при создании записи!'))
        });
    });