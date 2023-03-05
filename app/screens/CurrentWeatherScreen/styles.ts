import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    margin: 12,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#cbd5e0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
  },
  cardDark: {
    borderColor: '#cbd5e0',
    backgroundColor: '#1a202c',
  },
  name: {
    backgroundColor: '#7f5af0',
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  nameDark: {
    backgroundColor: '#6b46c1',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
    marginTop: 1,
    color: '#7f5af0',
  },
  textDark: {
    color: '#6b46c1',
  },
});
