class Person {
  static validate(person) {
    if (!person.name) throw new Error("name is required");
    if (!person.taxNumber) throw new Error("taxNumber is required");
  }

  static format(person) {
    const [name, ...lastName] = person.name.split(" ");

    return {
      taxNumber: person.taxNumber.replace(/\D/g, ""),
      name,
      lastName: lastName.join(" "),
    };
  }
  static save(person) {
    const hasRequiredProps = ["taxNumber", "name", "lastName"].every(
      (prop) => person[prop]
    );

    if (!hasRequiredProps)
      throw new Error(`cannot save invalid person: ${JSON.stringify(person)}`);

    console.log("saved with success!", person);
  }
  static process(person) {
    this.validate(person);
    const formattedPerson = this.format(person);
    this.save(formattedPerson);
    return "ok";
  }
}

export default Person;
