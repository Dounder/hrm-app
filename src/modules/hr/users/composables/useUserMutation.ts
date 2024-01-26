import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from 'src/boot';
import { NewUser, User } from '../interfaces/user.interface';

const addUser = async (user: NewUser) => {
  const { username, email, password, roles } = user;

  const { data } = await api.post<User>('/users', { username, email, password, roles });

  return data;
};

const useUserMutation = () => {
  const queryClient = useQueryClient();

  const userMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: false });

      queryClient.refetchQueries({ queryKey: ['users'], exact: false });

      queryClient.setQueryData(['users'], user);
    },
  });
  return {
    //* Props
    userMutation,
    //! Getters
    bulkUsers: async () => {
      const requests = [];
      for (const user of users) requests.push(addUser(user));

      await Promise.all(requests);

      console.log('Bulk users added');
    },
    //? Methods
  };
};

export default useUserMutation;

const users = [
  { username: 'cedlington0', email: 'kbugge0@oakley.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'dtorns1', email: 'jvipan1@businessweek.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'btremblay2', email: 'jridel2@cyberchimps.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'vgullam3', email: 'jfessler3@taobao.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'kphillippo4', email: 'dwatsonbrown4@mapy.cz', password: 'Aa1234!', roles: ['User'] },
  { username: 'emcentagart5', email: 'vgarbutt5@github.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'ihoopper6', email: 'tgabotti6@icq.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'rryves7', email: 'flerwill7@cbslocal.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'cclacson8', email: 'edegowe8@huffingtonpost.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'trainy9', email: 'mgrinstead9@chron.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'bsteinera', email: 'cfeehilya@princeton.edu', password: 'Aa1234!#', roles: ['User'] },
  { username: 'kcrumlyb', email: 'plejeanb@youku.com', password: 'Aa1234!{', roles: ['User'] },
  { username: 'jmaciejac', email: 'jhamlingtonc@kickstarter.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'dilbertd', email: 'ldarkod@yolasite.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'ldukere', email: 'dsimione@cargocollective.com', password: 'Aa1234!.{', roles: ['User'] },
  { username: 'ablampyf', email: 'tdovydenasf@live.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'lgabrielg', email: 'alehrerg@businessweek.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'nmcaleesh', email: 'lwhitwamh@odnoklassniki.ru', password: 'Aa1234!', roles: ['User'] },
  { username: 'cmeconii', email: 'ncampanellei@blogspot.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'dclohissyj', email: 'mgainesj@aboutads.info', password: 'Aa1234!', roles: ['User'] },
  { username: 'aticknerk', email: 'mrohloffk@eepurl.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'akrammerl', email: 'cborastonl@amazon.co.uk', password: 'Aa1234!', roles: ['User'] },
  { username: 'jespadaterm', email: 'pknappettm@meetup.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'gmacalistern', email: 'kscedalln@cpanel.net', password: 'Aa1234!', roles: ['User'] },
  { username: 'sgoodwello', email: 'oyarhamo@dell.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'gberardtp', email: 'ttroucherp@pinterest.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'mcomberbachq', email: 'ebaitsonq@nifty.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'bauburyr', email: 'cyoxallr@hao123.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'kproberts', email: 'kdumingos@oracle.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'gdyerst', email: 'pthackrayt@ibm.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'vbleacklyu', email: 'akellicku@cocolog-nifty.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'tcuerv', email: 'gtapsonv@amazon.co.uk', password: 'Aa1234!', roles: ['User'] },
  { username: 'mborkinw', email: 'mlyosikw@typepad.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'nanandx', email: 'cgreslyx@flickr.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'bschierschy', email: 'cdelaciy@constantcontact.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'dbartelz', email: 'ibradanez@go.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'wcappleman10', email: 'cbalint10@cisco.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'flarmor11', email: 'nbelliveau11@amazon.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'mseemmonds12', email: 'coclovan12@businesswire.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'wpinnock13', email: 'bjoule13@salon.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'ldavio14', email: 'scantero14@engadget.com', password: 'Aa1234!/', roles: ['User'] },
  { username: 'ksnazel15', email: 'sfearey15@loc.gov', password: 'Aa1234!', roles: ['User'] },
  { username: 'dstrainge16', email: 'hpithie16@mac.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'alegrand17', email: 'dtrusler17@phoca.cz', password: 'Aa1234!&', roles: ['User'] },
  { username: 'cradmore18', email: 'gklehn18@gnu.org', password: 'Aa1234!', roles: ['User'] },
  { username: 'cboundy19', email: 'saxten19@ft.com', password: 'Aa1234!)', roles: ['User'] },
  { username: 'bformie1a', email: 'hmilnes1a@cdc.gov', password: 'Aa1234!', roles: ['User'] },
  { username: 'fwhaley1b', email: 'hmclelland1b@china.com.cn', password: 'Aa1234!>', roles: ['User'] },
  { username: 'rbulward1c', email: 'eeverix1c@va.gov', password: 'Aa1234!', roles: ['User'] },
  { username: 'anacey1d', email: 'nfloweth1d@wix.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'cvandervelde1e', email: 'msillito1e@netlog.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'visacoff1f', email: 'jdomoni1f@dropbox.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'mdrei1g', email: 'gtilbrook1g@hibu.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'gpickersgill1h', email: 'kpentecost1h@bloomberg.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'bmcdowell1i', email: 'dellard1i@chicagotribune.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'aludron1j', email: 'sjukubczak1j@archive.org', password: 'Aa1234!', roles: ['User'] },
  { username: 'tbraams1k', email: 'emockler1k@prnewswire.com', password: 'Aa1234!~|', roles: ['User'] },
  { username: 'ptrembey1l', email: 'cllelweln1l@phoca.cz', password: 'Aa1234!', roles: ['User'] },
  { username: 'vfaint1m', email: 'adoohey1m@reference.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'gagglio1n', email: 'rwalewicz1n@ustream.tv', password: 'Aa1234!', roles: ['User'] },
  { username: 'wlundie1o', email: 'dduny1o@dell.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'mschubart1p', email: 'kmarland1p@typepad.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'aholyland1q', email: 'mdomoni1q@over-blog.com', password: 'Aa1234!}', roles: ['User'] },
  { username: 'ghoffman1r', email: 'hsmorfit1r@wikipedia.org', password: 'Aa1234!(', roles: ['User'] },
  { username: 'bdurrance1s', email: 'lwitchell1s@google.es', password: 'Aa1234!', roles: ['User'] },
  { username: 'dpurkess1t', email: 'sripley1t@ft.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'abinnall1u', email: 'kcausby1u@umn.edu', password: 'Aa1234!$!', roles: ['User'] },
  { username: 'cobradain1v', email: 'awarry1v@tripod.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'adivill1w', email: 'sghiriardelli1w@bing.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'dbrignell1x', email: 'amanoch1x@tiny.cc', password: 'Aa1234!', roles: ['User'] },
  { username: 'mmaleney1y', email: 'clefranc1y@wufoo.com', password: 'Aa1234!+<', roles: ['User'] },
  { username: 'lpuig1z', email: 'ncostelow1z@meetup.com', password: 'Aa1234!}', roles: ['User'] },
  { username: 'dsecombe20', email: 'hvickors20@qq.com', password: 'Aa1234!{', roles: ['User'] },
  { username: 'afolbig21', email: 'sdemko21@hao123.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'pmellonby22', email: 'rdomoni22@livejournal.com', password: 'Aa1234!<+', roles: ['User'] },
  { username: 'driseam23', email: 'amcnickle23@yandex.ru', password: 'Aa1234!', roles: ['User'] },
  { username: 'tfarries24', email: 'mround24@wunderground.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'mhuchot25', email: 'nstutt25@51.la', password: 'Aa1234!', roles: ['User'] },
  { username: 'ynimmo26', email: 'pbointon26@people.com.cn', password: 'Aa1234!', roles: ['User'] },
  { username: 'edodamead27', email: 'bposthill27@g.co', password: 'Aa1234!&%', roles: ['User'] },
  { username: 'creddlesden28', email: 'ebeldham28@weibo.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'fdavoren29', email: 'bblampied29@xrea.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'msutherns2a', email: 'lparkhouse2a@twitter.com', password: 'Aa1234!,', roles: ['User'] },
  { username: 'djacketts2b', email: 'kmaffioni2b@senate.gov', password: 'Aa1234!', roles: ['User'] },
  { username: 'bsimester2c', email: 'cbuller2c@histats.com', password: 'Aa1234!)', roles: ['User'] },
  { username: 'mpouck2d', email: 'rbenoix2d@alexa.com', password: 'Aa1234!%', roles: ['User'] },
  { username: 'chowells2e', email: 'kcooke2e@simplemachines.org', password: 'Aa1234!', roles: ['User'] },
  { username: 'ahyndman2f', email: 'lfydo2f@netscape.com', password: 'Aa1234!@', roles: ['User'] },
  { username: 'fkilkenny2g', email: 'gprichet2g@yahoo.com', password: 'Aa1234!&', roles: ['User'] },
  { username: 'lcuddihy2h', email: 'tclausewitz2h@berkeley.edu', password: 'Aa1234!', roles: ['User'] },
  { username: 'smaylott2i', email: 'tfrowen2i@sun.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'hpala2j', email: 'baronsohn2j@independent.co.uk', password: 'Aa1234!', roles: ['User'] },
  { username: 'lgarlic2k', email: 'abread2k@businessinsider.com', password: 'Aa1234!*', roles: ['User'] },
  { username: 'llinde2l', email: 'ophorsby2l@businessinsider.com', password: 'Aa1234!`', roles: ['User'] },
  { username: 'jroblett2m', email: 'mbox2m@nasa.gov', password: 'Aa1234!/', roles: ['User'] },
  { username: 'jchalfain2n', email: 'tmarcos2n@ezinearticles.com', password: 'Aa1234!', roles: ['User'] },
  { username: 'yserrels2o', email: 'mdelhay2o@fda.gov', password: 'Aa1234!', roles: ['User'] },
  { username: 'mrehorek2p', email: 'uroder2p@netvibes.com', password: "Aa1234!'", roles: ['User'] },
  { username: 'cstanistreet2q', email: 'hcubbin2q@addthis.com', password: 'Aa1234!"', roles: ['User'] },
  { username: 'rroyds2r', email: 'mplaskett2r@eventbrite.com', password: 'Aa1234!', roles: ['User'] },
];
