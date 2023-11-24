function xoataikhoan(url,id) {
    Swal.fire({
        title: 'Xác Nhận Xóa',
        text: "Bạn có đồng ý xóa tài khoản này không ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa ngay'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url+"assets/ajaxs/Auth.php",
                method: "POST",
                data: {
                    type:"DeleteAccount",
                    id: id
                },
                success: function(response) {
                    $("#thongbao").html(response);
                   
                }
            });
        } 
    })
};