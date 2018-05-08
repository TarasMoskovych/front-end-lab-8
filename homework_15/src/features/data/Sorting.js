const sortById = input => {
    input.sort((item1, item2) => item1.id - item2.id);
};

export default sortById;