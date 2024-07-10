import { User } from '../user/User';
import { Superhero } from './Superhero';

describe('Superhero Type', () => {
  it('should create a Superhero object with the correct types', () => {
    const user: User = {
        role: 'ADMIN',
        email: 'john.doe@example.com'
      };

    const superhero: Superhero = {
      id: 101,
      alias: 'Spiderman',
      realName: 'Peter Parker',
      dateOfBirth: '1995-08-10',
      gender: 'Male',
      occupation: 'Photographer',
      originStory: 'Bitten by a radioactive spider',
      user: user
    };

    expect(superhero.id).toBe(101);
    expect(superhero.alias).toBe('Spiderman');
    expect(superhero.realName).toBe('Peter Parker');
    expect(superhero.dateOfBirth).toBe('1995-08-10');
    expect(superhero.gender).toBe('Male');
    expect(superhero.occupation).toBe('Photographer');
    expect(superhero.originStory).toBe('Bitten by a radioactive spider');
    expect(superhero.user).toBe(user);
  });
});
